import { PreviewIssueType } from './preview-issue.type';

export interface PreviewIssue {
  issueType: PreviewIssueType;
  variableName?: string;
  message: string;
}
