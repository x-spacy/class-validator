import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions
} from 'class-validator';

import { IsCNPJ } from '@x-spacy/class-validator/services/IsCNPJ';
import { IsCPF } from '@x-spacy/class-validator/services/IsCPF';

import { DocumentTypeEnum } from '@x-spacy/class-validator/enums/DocumentTypeEnum';

export function IsDocument(isDocumentOptions: { type: DocumentTypeEnum }, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsDocument',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(document: unknown, _args: ValidationArguments) {
          if (typeof document !== 'string') {
            return false;
          }

          switch (isDocumentOptions.type) {
            case DocumentTypeEnum.CPF: {
              return IsCPF(document);
            }
            case DocumentTypeEnum.CNPJ: {
              return IsCNPJ(document);
            }
            default: {
              return false;
            }
          }
        },
        defaultMessage() {
          return 'Informe um documento válido';
        }
      }
    });
  };
}
