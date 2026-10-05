import { TOPICS_PART_1 } from './topicsPart1';
import { TOPICS_PART_2 } from './topicsPart2';
import { TOPICS_PART_3 } from './topicsPart3';
import {
  CleanGrammarTopic,
  GrammarSectionItem,
  GrammarComparisonTable
} from './grammarHandbookTypes';

export * from './grammarHandbookTypes';

// Combine all 18 core topics with complete, rigorous, high-school curriculum theory
export const CLEAN_GRAMMAR_TOPICS: CleanGrammarTopic[] = [
  ...TOPICS_PART_1,
  ...TOPICS_PART_2,
  ...TOPICS_PART_3
];

// Helper to find a topic by its ID
export const getTopicById = (id: string): CleanGrammarTopic | undefined => {
  return CLEAN_GRAMMAR_TOPICS.find((t) => t.id === id);
};

// Helper to find a topic by topic number (1 to 18)
export const getTopicByNumber = (num: number): CleanGrammarTopic | undefined => {
  return CLEAN_GRAMMAR_TOPICS.find((t) => t.topicNumber === num);
};
