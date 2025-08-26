import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import { isCNPJ } from '@x-spacy/class-validator/services/IsCNPJ';
import { isCPF } from '@x-spacy/class-validator/services/IsCPF';
import { isCREF } from '@x-spacy/class-validator/services/IsCREF';
import { isCRM } from '@x-spacy/class-validator/services/IsCRM';
import { isCRN } from '@x-spacy/class-validator/services/IsCRN';

import { DocumentTypeEnum } from '@x-spacy/class-validator/enums/DocumentTypeEnum';

@ValidatorConstraint({ name: 'IsDocument', async: false })
export class IsDocumentConstraint implements ValidatorConstraintInterface {
  validate(document: unknown, args: ValidationArguments) {
    if (typeof document !== 'string') {
      return false;
    }

    const options = args.constraints[0] as { type?: DocumentTypeEnum };
    const instance = args.object as { type?: DocumentTypeEnum };

    const type = options?.type ?? instance.type;

    switch (type) {
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
  }

  defaultMessage() {
    return 'Informe um documento válido';
  }
}

export function IsDocument(isDocumentOptions: { type?: DocumentTypeEnum } = {}, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsDocument',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [ isDocumentOptions ],
      validator: IsDocumentConstraint
    });
  };
}
