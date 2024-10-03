// Base interface for all renderers
import {
  ChatPreviewResult,
  EmailPreviewResult,
  InAppPreviewResult,
  PreviewResult,
  PushPreviewResult,
  RedirectTargetEnum,
  SmsPreviewResult,
  StepTypeEnum,
} from '@novu/shared';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Renderer<T extends PreviewResult> {
  render(controlValues: Record<string, unknown>): T;
}

export class OutputRendererFactory {
  static createRenderer(stepType: StepTypeEnum): Renderer<unknown> {
    switch (stepType) {
      case StepTypeEnum.CHAT:
        return new ChatPreviewRenderer();
      case StepTypeEnum.SMS:
        return new SmsPreviewRenderer();
      case StepTypeEnum.PUSH:
        return new PushPreviewRenderer();
      case StepTypeEnum.EMAIL:
        return new EmailPreviewRenderer();
      case StepTypeEnum.IN_APP:
        return new InAppPreviewRenderer();
      default:
        throw new Error(`Unknown step type: ${stepType}`);
    }
  }
}

// Concrete Renderer for Chat Preview
class ChatPreviewRenderer implements Renderer<ChatPreviewResult> {
  render(controlValues: Record<string, unknown>): ChatPreviewResult {
    const message = (controlValues.message as string) || 'Default chat message';

    return { body: message };
  }
}

// Concrete Renderer for SMS Preview
class SmsPreviewRenderer implements Renderer<SmsPreviewResult> {
  render(controlValues: Record<string, unknown>): SmsPreviewResult {
    const smsMessage = (controlValues.smsMessage as string) || 'Default SMS message';

    return { body: smsMessage };
  }
}

// Concrete Renderer for Push Notification Preview
class PushPreviewRenderer implements Renderer<PushPreviewResult> {
  render(controlValues: Record<string, unknown>): PushPreviewResult {
    const subject = (controlValues.subject as string) || 'Default Push Notification Subject';
    const body = (controlValues.body as string) || 'Default Push Notification Body';

    return { subject, body };
  }
}

// Concrete Renderer for Email Preview
class EmailPreviewRenderer implements Renderer<EmailPreviewResult> {
  render(controlValues: Record<string, unknown>): EmailPreviewResult {
    const subject = (controlValues.subject as string) || 'Default Email Subject';
    const body = (controlValues.body as string) || 'Default Email Body';

    return { subject, body };
  }
}

// Concrete Renderer for In-App Message Preview
class InAppPreviewRenderer implements Renderer<InAppPreviewResult> {
  render(controlValues: Record<string, unknown>): InAppPreviewResult {
    const subject = (controlValues.subject as string) || 'Default In-App Message Subject';
    const body = (controlValues.body as string) || 'Default In-App Message Body';
    const avatar = controlValues.avatar as string; // Optional
    const primaryActionLabel = (controlValues.primaryActionLabel as string) || 'Primary Action';
    const primaryActionUrl = (controlValues.primaryActionUrl as string) || 'http://default.url';
    const primaryActionTarget = (controlValues.primaryActionTarget as RedirectTargetEnum) || RedirectTargetEnum.SELF;

    const secondaryActionLabel = controlValues.secondaryActionLabel as string; // Optional
    const secondaryActionUrl = controlValues.secondaryActionUrl as string; // Optional
    const secondaryActionTarget = controlValues.secondaryActionTarget as RedirectTargetEnum; // Optional

    const redirectUrl = (controlValues.redirectUrl as string) || 'http://default.redirect.url';
    const redirectTarget = (controlValues.redirectTarget as RedirectTargetEnum) || RedirectTargetEnum.SELF;

    return {
      subject,
      body,
      avatar,
      primaryAction: {
        label: primaryActionLabel,
        redirect: {
          url: primaryActionUrl,
          target: primaryActionTarget,
        },
      },
      secondaryAction: secondaryActionLabel
        ? {
            label: secondaryActionLabel,
            redirect: {
              url: secondaryActionUrl,
              target: secondaryActionTarget,
            },
          }
        : undefined,
      redirect: {
        url: redirectUrl,
        target: redirectTarget,
      },
    };
  }
}
