import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'error-message',
  standalone: true,
  imports: [MessagesModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
})
export class ErrorMessageComponent {
  @Input() ctrl!: FormControl;
  ERROR_MESSAGE: any = {
    email: () => `this field is Invalid.\r\n`,

    required: () => `This field is required.\r\n`,
    minlength: (par: any) =>
      `Must be atleast ${par.requiredLength} Characters.\r\n`,
    min: (par: any) => `Must be atleast ${par.min} Characters.\r\n`,
    maxlength: (par: any) =>
      `Must be less than ${par.requiredLength} Characters.\r\n`,
    max: (par: any) => `${par?.requiredPattern}`,
    notSame: () => ``,
    pattern: (par: any) => `${par?.requiredPattern}`,
  };

  shouldShowErrors(): boolean {
    return this.ctrl! && this.ctrl?.errors! && this.ctrl?.touched;
  }

  get listOfErrors(): Message[] {
    if (this.ctrl?.errors) {
      return Object.keys(this.ctrl?.errors).map((err) => {
        return {
          severity: 'error',
          detail: this.ERROR_MESSAGE[err](this.ctrl.getError(err)),
        };
      });
    }
    return null!
  }

  patternCase(pattern: string): string {
    var caseMessage: string = pattern;
    switch (pattern) {
      case '/[A-Z]/':
        caseMessage =
          'Must contain at least 1 number!.\r\nMust contain at least 1 in Capital Case!.\r\nMust contain at least 1 Letter in Small Case!.\r\nMust contain at least 1 Special Character!.\r\n';
        break;
      case '/[a-z]/':
        caseMessage =
          'Must contain at least 1 number!.\r\nMust contain at least 1 in Capital Case!.\r\nMust contain at least 1 Letter in Small Case!.\r\nMust contain at least 1 Special Character!.\r\n';
        break;
      case '/[0-9]/':
        caseMessage =
          'Must contain at least 1 number!.\r\nMust contain at least 1 in Capital Case!.\r\nMust contain at least 1 Letter in Small Case!.\r\nMust contain at least 1 Special Character!.\r\n';
        break;
      case '/[!@#$%&*-+?]/':
        caseMessage =
          'Must contain at least 1 number!.\r\nMust contain at least 1 in Capital Case!.\r\nMust contain at least 1 Letter in Small Case!.\r\nMust contain at least 1 Special Character!.\r\n';
        break;
      case '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$':
        caseMessage = '';
        break;
      case '^[0-9]{9}$':
        caseMessage = '';
        break;

      default:
        break;
    }
    return caseMessage;
  }
}
