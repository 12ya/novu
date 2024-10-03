import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';

import { GeneratePreviewRequestDto, GeneratePreviewResponseDto, UserSessionData } from '@novu/shared';
import { ExternalApiAccessible, UserSession } from '@novu/application-generic';
import { StepType } from '@novu/framework';

import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetStepSchemaCommand } from './usecases/get-step-schema/get-step-schema.command';
import { UserAuthentication } from '../shared/framework/swagger/api.key.security';
import { GetStepSchema } from './usecases/get-step-schema/get-step-schema.usecase';
import { SchemaTypeDto } from './dtos/schema-type.dto';
import { GeneratePreviewUseCase } from './usecases/generate-preview/generate-preview-use-case';
import { GeneratePreviewCommand } from './usecases/generate-preview/generate-preview-command';

@Controller('/step-schemas')
@UserAuthentication()
@UseInterceptors(ClassSerializerInterceptor)
export class StepSchemasController {
  constructor(
    private getStepDefaultSchemaUsecase: GetStepSchema,
    private generatePreviewUseCase: GeneratePreviewUseCase
  ) {}

  @Get('/:stepType')
  @ApiOperation({
    summary: 'Get step schema',
    description: 'Get the schema for a step type',
  })
  @ApiParam({
    name: 'stepType',
    type: String,
    description: 'The type of step to get the schema for.',
  })
  @ExternalApiAccessible()
  async getStepSchema(
    @UserSession() user: UserSessionData,
    @Param('stepType') stepType: StepType
  ): Promise<SchemaTypeDto> {
    const schema = await this.getStepDefaultSchemaUsecase.execute(
      GetStepSchemaCommand.create({
        organizationId: user.organizationId,
        environmentId: user.environmentId,
        userId: user._id,
        stepType,
      })
    );

    return { schema };
  }
  @Post('/:stepType/preview')
  async generatePreview(
    @UserSession() user: UserSessionData,
    @Param('stepType') stepType: StepType,
    @Body() generatePreviewDto: GeneratePreviewRequestDto
  ): Promise<GeneratePreviewResponseDto> {
    return await this.generatePreviewUseCase.execute(
      GeneratePreviewCommand.create({
        organizationId: user.organizationId,
        environmentId: user.environmentId,
        userId: user._id,
        stepType,
      })
    );
  }
}
