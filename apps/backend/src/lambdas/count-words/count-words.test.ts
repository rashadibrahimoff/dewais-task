// @ts-ignore
import { describe, it } from 'node:test';
// @ts-ignore
import assert from "node:assert";
import { APIGatewayEvent } from 'aws-lambda';
import { handler } from './count-words.handler';
import { WordType } from './types/word-type.enum';

describe('countWords', () => {
  it('should fail if event is not valid', async () => {
    try {
      // Arrange
      const event = {
        // No body exists
      } as APIGatewayEvent;

      // Act
      await handler(event);
    } catch (err: any) {
      // Assert
      assert.strictEqual(err.message, 'Unexpected token u in JSON at position 0');
    }
  });

  it('should not consider comma and return noun = 0 for text: cat,', async () => {
    // Arrange
    const event = {
      body: JSON.stringify({
        text: 'cat,',
      }),
    } as APIGatewayEvent;
    const resultBody = Object.values(WordType).reduce((acc, wordType) => ({ ...acc, [wordType]: 0 }), {}) as Record<WordType, number>;

    // Act
    const result = await handler(event);

    // Assert
    assert.strictEqual(result?.statusCode, 200);
    assert.strictEqual(result?.body, JSON.stringify(resultBody));
  });

  it('should return noun = 1 for text: cat', async () => {
    // Arrange
    const event = {
      body: JSON.stringify({
        text: 'cat',
      }),
    } as APIGatewayEvent;
    const resultBody = Object.values(WordType).reduce((acc, wordType) => ({ ...acc, [wordType]: 0 }), {}) as Record<WordType, number>;
    resultBody.noun = 1;

    // Act
    const result = await handler(event);

    // Assert
    assert.strictEqual(result?.statusCode, 200);
    assert.strictEqual(result?.body, JSON.stringify(resultBody));
  });

  it('should return noun = 1, verb = 1, adverb = 1 for text: cat laugh loudly', async() => {
    // Arrange
    const event = {
      body: JSON.stringify({
        text: 'cat laugh loudly',
      }),
    } as APIGatewayEvent;
    const resultBody = Object.values(WordType).reduce((acc, wordType) => ({ ...acc, [wordType]: 0 }), {}) as Record<WordType, number>;
    resultBody.noun = 1;
    resultBody.verb = 1;
    resultBody.adverb = 1;

    // Act
    const result = await handler(event);

    // Assert
    assert.strictEqual(result?.statusCode, 200);
    assert.strictEqual(result?.body, JSON.stringify(resultBody));
  });
});
