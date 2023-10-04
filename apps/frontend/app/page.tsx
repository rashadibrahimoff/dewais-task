import WordCounter from './_components/word-counter';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col place-items-center w-2/3">
        <WordCounter></WordCounter>
      </div>
    </main>
  )
}
