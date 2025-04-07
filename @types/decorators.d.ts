declare module '@x-spacy/validators' {
  export type IsDocumentOptions = {
    type: DocumentTypeEnum;
  };
  export declare function IsDocument(isDocumentOptions: IsDocumentOptions, validationOptions?: ValidationOptions): PropertyDecorator;
}
