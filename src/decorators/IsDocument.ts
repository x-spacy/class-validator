import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from 'class-validator';

import { isCNPJ } from '@x-spacy/class-validator/services/IsCNPJ';
import { isCPF } from '@x-spacy/class-validator/services/IsCPF';
import { isCREF } from '@x-spacy/class-validator/services/IsCREF';
import { isCRM } from '@x-spacy/class-validator/services/IsCRM';
import { isCRN } from '@x-spacy/class-validator/services/IsCRN';

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
              return isCPF(document);
            }
            case DocumentTypeEnum.CNPJ: {
              return isCNPJ(document);
            }
            case DocumentTypeEnum.CRN: {
              return isCRN(document);
            }
            case DocumentTypeEnum.CREF: {
              return isCREF(document);
            }
            case DocumentTypeEnum.CRM: {
              return isCRM(document);
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
