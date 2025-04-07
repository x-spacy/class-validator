import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from 'class-validator';

import { DocumentTypeEnum } from '@x-spacy/validators/enums/DocumentTypeEnum';

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

              if (document.length !== 11) {
                return false;
              }

              const digits = document.split('').map(Number);

              let sum = 0;

              for (let i = 0; i < 9; i++) {
                sum += digits[i] * (10 - i);
              }

              let firstVerifier = (sum * 10) % 11;

              if (firstVerifier === 10 || firstVerifier === 11) {
                firstVerifier = 0;
              }

              if (firstVerifier !== digits[9]) {
                return false;
              }

              sum = 0;

              for (let i = 0; i < 10; i++) {
                sum += digits[i] * (11 - i);
              }

              let secondVerifier = (sum * 10) % 11;

              if (secondVerifier === 10 || secondVerifier === 11) {
                secondVerifier = 0;
              }

              if (secondVerifier !== digits[10]) {
                return false;
              }

              return true;
            }
            case DocumentTypeEnum.CNPJ: {
              if (document.length !== 14) {
                return false;
              }

              if (/^(\d)\1+$/.test(document)) {
                return false;
              }

              const weights1 = [ 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ];
              const weights2 = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ];

              let sum = 0;

              for (let i = 0; i < 12; i++) {
                sum += parseInt(document.charAt(i)) * weights1[i];
              }

              const digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

              sum = 0;

              for (let i = 0; i < 13; i++) {
                sum += parseInt(document.charAt(i)) * weights2[i];
              }

              const digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

              return digit1 === parseInt(document.charAt(12)) && digit2 === parseInt(document.charAt(13));
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
