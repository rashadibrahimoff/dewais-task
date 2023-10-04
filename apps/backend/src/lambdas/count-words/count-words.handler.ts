import { APIGatewayEvent } from 'aws-lambda';
import { vocabularyInverted } from './resources/vocabulary-inverted';
import { WordType } from './types/word-type.enum';
import { CountWordsEventBody } from './types/count-words-event-body.interface';

export const handler = async (event: APIGatewayEvent) => {
  console.log('Event', event);
  
  try {
    // Build empty result object
    // Initial counter for each word type is zero
    const result = Object
      .values(WordType)
      .reduce((acc, wordType) => ({ ...acc, [wordType]: 0 }), {}) as Record<WordType, number>;
    
    // Split text into words following rules below
    // - What is not in the vocabulary is ignored.
    // - Ignore endings for simplicity. “cat” and “cats”, “play” and “played”, “work” and
    //   “working” are different words, we don’t care - calculate only what is within the vocabulary.
    // - Ignore punctuation symbols for simplicity. “space” is the only delimiter. “cat”
    //   and “cat,” (cat + comma) are considered as different words and so we ignore
    //   “cat,” as it is not in our vocabulary
    const { text }: CountWordsEventBody = JSON.parse(event.body!);
    const words = text.split(' ');

    // Calculate words by types
    // If a word exists in vocabulary increment its type by 1
    for (const word of words) {
      if (vocabularyInverted[word]) {
        result[vocabularyInverted[word]!] += 1;
      }
    }

    console.log('Result', result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.log('Error', err);
    
    throw err;
  }
};