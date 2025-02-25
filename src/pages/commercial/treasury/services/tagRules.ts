
import { TreasuryTag, TreasuryTransaction } from "@/types/treasury";

export function matchTagRule(pattern: string, text: string): boolean {
  // Convert wildcard pattern to regex
  const regexPattern = pattern
    .replace(/\*/g, '.*')  // Convert * to .*
    .replace(/\?/g, '.'); // Convert ? to .
  
  const regex = new RegExp(`^${regexPattern}$`, 'i');
  return regex.test(text);
}

export function applyTagRules(transaction: TreasuryTransaction, tags: TreasuryTag[]): string[] {
  // Start with existing manual tags
  const existingTags = new Set(transaction.tags);
  
  // Apply automatic rules
  tags.forEach(tag => {
    if (tag.rule_pattern && tag.is_active) {
      const shouldApplyTag = matchTagRule(
        tag.rule_pattern,
        transaction.description || ''
      );
      
      if (shouldApplyTag) {
        existingTags.add(tag.name);
      }
    }
  });
  
  return Array.from(existingTags);
}
