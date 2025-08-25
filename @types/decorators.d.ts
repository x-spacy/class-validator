declare module '@x-spacy/class-validator' {
  export type IsDocumentOptions = {
    type: DocumentTypeEnum;
  };

  export declare function IsDocument(isDocumentOptions: IsDocumentOptions, validationOptions?: ValidationOptions): PropertyDecorator;

  export * from 'class-validator';
}
