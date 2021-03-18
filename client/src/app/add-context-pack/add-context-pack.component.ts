import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CtxPk } from '../context-packs/context-pack';
import { CtxPkService } from '../context-packs/context-pack.service';
import { WordList } from '../word-lists/word-list';


@Component({
  selector: 'app-add-context-pack',
  templateUrl: './add-context-pack.component.html',
  styleUrls: ['./add-context-pack.component.scss']
})
export class AddContextPackComponent implements OnInit {

  addContextPackForm: FormGroup;

  contextPack: CtxPk;

  addContextPackValidationMessages = {
    name: [
      {type: 'required', message: 'Name is Required'},
      {type: 'minlength', message: 'Name must be at least 2 characters long'},
      {type: 'maxlength', message: 'Name cannot be more than 50 characters long'},
      {type: 'existingName', message: 'Name has already been taken'}
    ],

    enabled: [
      {type: 'required', message: 'Enabled is Required'},
      {type: 'pattern', message: 'Enabled must be true or false'}
    ]
  };

  constructor(private fb: FormBuilder, private contextPackService: CtxPkService, private snackBar: MatSnackBar, private router: Router) {
  }

  createForms() {

    this.addContextPackForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        // In the real world you'd want to be very careful about having
        // an upper limit like this because people can sometimes have
        // very long names. This demonstrates that it's possible, though,
        // to have maximum length limits.
        Validators.maxLength(50),
        (fc) => {
          if (fc.value.toLowerCase() === 'abc123' || fc.value.toLowerCase() === '123abc') {
            return ({existingName: true});
          } else {
            return null;
          }
        },
      ])),

      enabled: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(true|false)$')
      ])),

      nouns: new FormControl('', Validators.compose([

      ])),

      verbs: new FormControl('', Validators.compose([

      ])),

      adjectives: new FormControl('', Validators.compose([

      ])),

      misc: new FormControl('', Validators.compose([

      ])),
    });

  }

  ngOnInit() {
    this.createForms();
  }

  submitForm() {
    this.contextPackService.addWordList(this.addContextPackForm.value).subscribe(newID => {
      this.snackBar.open('Added Context Pack ' + this.addContextPackForm.value.name, null, {
        duration: 2000,
      });
      this.router.navigate(['/ctxPks/', newID]);
    }, err => {
      this.snackBar.open('Failed to add the context pack', 'OK', {
        duration: 5000,
      });
    });
  }

}
