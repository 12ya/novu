import { ControlPreviewIssue, PreviewIssueType } from '@novu/shared';

export class VariableValidatorComponent {
  /**
   * Collects placeholders from the provided object and returns an object
   * where each key is a placeholder and its value is the original key
   * from which the placeholder was found.
   *
   * @param {any} obj - The input object containing strings with placeholders.
   * @returns {Record<string, string>} An object mapping placeholders to their original keys.
   */
  private collectPlaceholders(obj: any): Record<string, string> {
    const placeholders: Record<string, string> = {};

    function recursiveSearch(value: any, originalKey: string | null = null) {
      if (typeof value === 'string') {
        const regex = /{{(.*?)}}/g;
        let match;
        // eslint-disable-next-line no-cond-assign
        while ((match = regex.exec(value)) !== null) {
          const placeholder = match[1].trim();
          placeholders[placeholder] = originalKey || '';
        }
      } else if (Array.isArray(value)) {
        for (const item of value) {
          recursiveSearch(item, originalKey);
        }
      } else if (typeof value === 'object' && value !== null) {
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            recursiveSearch(value[key], key);
          }
        }
      }
    }

    recursiveSearch(obj);

    return placeholders;
  }

  searchAndValidatePlaceholderExistence(controls: object, payload: object): Record<string, ControlPreviewIssue[]> {
    const placeholders = this.collectPlaceholders(controls);

    return this.validatePlaceholders(placeholders, payload);
  }

  /**
   * Validates the placeholders against the original object and returns an object of issues.
   *
   * @param {Record<string, string>} placeholders - The object mapping placeholders to their original keys.
   * @param {any} originalObj - The original object to validate against.
   * @returns {Record<string, ControlPreviewIssue[]>} An object mapping original values to an array of issues.
   */
  public validatePlaceholders(
    placeholders: Record<string, string>,
    originalObj: any
  ): Record<string, ControlPreviewIssue[]> {
    const issues: Record<string, ControlPreviewIssue[]> = {};

    for (const placeholder in placeholders) {
      const originalKey = placeholders[placeholder];
      const originalValue = this.getValueByPath(originalObj, originalKey);

      if (originalValue === undefined) {
        issues[originalKey] = issues[originalKey] || [];
        issues[originalKey].push({
          issueType: PreviewIssueType.MISSING_VARIABLE_IN_PAYLOAD,
          variableName: placeholder,
          message: `The variable '${placeholder}' is missing in the payload.`,
        });
      } else if (typeof originalValue !== 'string') {
        issues[originalKey] = issues[originalKey] || [];
        issues[originalKey].push({
          issueType: PreviewIssueType.VARIABLE_TYPE_MISMATCH,
          variableName: placeholder,
          message: `The variable '${placeholder}' is expected to be a string, but got ${typeof originalValue}.`,
        });
      }
    }

    return issues;
  }

  /**
   * Retrieves the value from an object by a dot-separated path.
   *
   * @param {any} obj - The object to retrieve the value from.
   * @param {string} path - The dot-separated path to the value.
   * @returns {any} The value at the specified path, or undefined if not found.
   */
  private getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}
