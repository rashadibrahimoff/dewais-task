"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'
import { WordType } from './word-type.enum'

const FormSchema = z.object({
  text: z
    .string()
    .min(1, {
      message: "Text must be at least 1 characters.",
    })
})

export default function WordCounter() {
  const [result, setResult] = useState<Record<WordType, number> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const res = await fetch(
      'https://k5etvmds3d5ihoarlu5x5it25q0riplr.lambda-url.us-east-1.on.aws',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );
    const resBody = await res.json() as Record<WordType, number>;

    setIsLoading(false);
    setResult(resBody);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Put text here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>Submit</Button>
        </form>
      </Form>

      { result && (
        <div className='space-y-6 m-10'>
          <ul>
            {Object.entries(result).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
