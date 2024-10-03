import { Injectable } from '@nestjs/common';
import { ChannelTypeEnum, GeneratePreviewRequestDto, GeneratePreviewResponseDto } from '@novu/shared';
import { VariableValidatorComponent } from '../../components/variable-validator-component';
import { OutputRendererFactory } from '../../../environments/render/output-render-factory';

class GeneratePreviewCommand extends GeneratePreviewRequestDto {
  stepType: ChannelTypeEnum;
  shouldUseDefaultsIfMissing: boolean;
}

@Injectable()
export class GeneratePreviewUseCase {
  private validator: VariableValidatorComponent;
  async execute(command: GeneratePreviewCommand): Promise<GeneratePreviewResponseDto> {
    const referenceObj = this.buildHidrationObject(command);
    if (!command.shouldUseDefaultsIfMissing) {
      const missingPlaceholders = this.validator.searchAndValidatePlaceholderExistence(
        command.controlValues,
        referenceObj
      );
      if (Object.keys(missingPlaceholders).length > 0) {
        return { issues: missingPlaceholders };
      }
    }
    const valuesHidrated = hidrateControlValues(command.controlSchema, command.controlValues, referenceObj);
    const render = OutputRendererFactory.createRenderer(command.stepType).render(valuesHidrated);

    return { preview: { type: command.stepType, render } };
  }

  private buildHidrationObject(command: GeneratePreviewCommand) {
    return command.payload;
  }
}
function hidrateControlValues(controlValues: Record<string, unknown>, referenceObj: Record<string, unknown>): {};
