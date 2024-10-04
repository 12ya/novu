import { PreviewIssueType } from './preview-issue.type';

export interface ControlPreviewIssue {
  issueType: PreviewIssueType;
  variableName?: string;
  message: string;
}
