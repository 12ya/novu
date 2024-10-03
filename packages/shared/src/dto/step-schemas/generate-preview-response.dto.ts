import { PreviewIssue } from './preview.issue';
import { ChannelTypeEnum } from '../../types';

/**
 * Enum representing the possible target options for redirects.
 */
export enum RedirectTargetEnum {
  SELF = '_self',
  BLANK = '_blank',
  PARENT = '_parent',
  TOP = '_top',
  UNFENCED_TOP = '_unfencedTop',
}
/**
 * Base interface representing a generic preview result.
 */
export class PreviewResult {
  // Empty base class
}

/**
 * Interface representing the preview of a chat message.
 */
export class ChatPreviewResult extends PreviewResult {
  body: string; // Specific to ChatPreviewResult
}

/**
 * Interface representing the preview of an SMS message.
 */
export class SmsPreviewResult extends PreviewResult {
  body: string; // Specific to SmsPreviewResult
}

/**
 * Interface representing the preview of a push notification.
 */
export class PushPreviewResult extends PreviewResult {
  subject: string; // Specific to PushPreviewResult
  body: string; // Specific to PushPreviewResult
}

/**
 * Interface representing the preview of an email.
 */
export class EmailPreviewResult extends PreviewResult {
  subject: string; // Specific to EmailPreviewResult
  body: string; // Specific to EmailPreviewResult
}

/**
 * Interface representing the preview of an in-app message, including actions and additional data.
 */
export class InAppPreviewResult extends PreviewResult {
  subject: string; // Specific to InAppPreviewResult
  body: string; // Specific to InAppPreviewResult
  avatar?: string;
  primaryAction: {
    label: string;
    redirect: {
      url: string;
      target?: RedirectTargetEnum;
    };
  };
  secondaryAction?: {
    label: string;
    redirect: {
      url: string;
      target?: RedirectTargetEnum;
    };
  };
  data?: { [key: string]: unknown };
  redirect: {
    url: string;
    target?: RedirectTargetEnum;
  };
}

export type GeneratePreviewResponseDto = {
  issues: { [controlId: string]: PreviewIssue[] };
  preview?: {} & (
    | {
        type: ChannelTypeEnum.EMAIL;
        preview: EmailPreviewResult;
      }
    | {
        type: ChannelTypeEnum.IN_APP;
        preview: InAppPreviewResult;
      }
    | {
        type: ChannelTypeEnum.SMS;
        preview: SmsPreviewResult;
      }
    | {
        type: ChannelTypeEnum.PUSH;
        preview: PushPreviewResult;
      }
    | {
        type: ChannelTypeEnum.CHAT;
        preview: ChatPreviewResult;
      }
  );
};
