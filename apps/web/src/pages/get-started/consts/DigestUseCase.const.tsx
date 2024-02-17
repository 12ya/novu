import { ROUTES } from '@novu/shared-web';

import { GetStartedAnimationContainer } from '../components/GetStartedAnimationContainer';
import { Link, StepDescription, StepText } from './shared';
import { OnboardingNodeEnum, OnboardingUseCase } from './types';
import { OpenWorkflowButton } from '../components/OpenWorkflowButton';

const USECASE_BLUEPRINT_IDENTIFIER = 'get-started-digest';

export const DigestUseCaseConst: OnboardingUseCase = {
  title: 'Digest multiple events',
  description:
    'Aggregates multiple events into a single, concise message, preventing user overload with excessive notifications.',
  steps: [
    {
      title: 'Configure providers',
      Description: function () {
        return (
          <StepDescription>
            <StepText>
              Novu has set up trial email and SMS providers for you. To expand your options, add more providers in the
            </StepText>
            <Link children={' Integration store'} href={ROUTES.INTEGRATIONS_CREATE} />
            <StepText>.</StepText>
          </StepDescription>
        );
      },
    },

    {
      title: 'Build a workflow',
      Description: function () {
        return (
          <StepDescription>
            <StepText>Novu pre-built workflow with a digest node.</StepText>
            <OpenWorkflowButton children={' Customize '} blueprintIdentifier={USECASE_BLUEPRINT_IDENTIFIER} />
            <StepText>the workflow or create a new one on the Workflows page.</StepText>
          </StepDescription>
        );
      },
    },
    {
      title: 'Set-up a delay preferences',
      Description: function () {
        return (
          <StepDescription>
            <StepText>Novu pre-defined preferences for the digest node.</StepText>
            <OpenWorkflowButton
              children={' Customize digest node'}
              blueprintIdentifier={USECASE_BLUEPRINT_IDENTIFIER}
              node={OnboardingNodeEnum.DIGEST}
            />
            <StepText>.</StepText>
          </StepDescription>
        );
      },
    },
    {
      title: 'Connect trigger and run test',
      Description: function () {
        return (
          <StepDescription>
            <OpenWorkflowButton
              children={'Test the trigger '}
              blueprintIdentifier={USECASE_BLUEPRINT_IDENTIFIER}
              node={OnboardingNodeEnum.TEST_WORKFLOW}
            />
            <StepText>
              as if you sent it from your API. Add a subscriber by sending data to the trigger method. Click multiple
              times to see how the digest node butch messages.
            </StepText>
          </StepDescription>
        );
      },
    },
    {
      title: 'Track activity feed',
      Description: function () {
        return (
          <StepDescription>
            <StepText>Discover</StepText>
            <Link children={' activity feed '} href={ROUTES.ACTIVITIES} />
            <StepText>
              to monitor notifications activity and see potential issues with a specific provider or channel.
            </StepText>
          </StepDescription>
        );
      },
    },
  ],
  Demo: () => <GetStartedAnimationContainer assetDark={'Dark Placeholder'} assetLight={'Light Placeholder'} />,
};
