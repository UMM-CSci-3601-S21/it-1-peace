import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WordList } from '../word-lists/word-list';
import { WordListService } from '../word-lists/word-list.service';

@Component({
  selector: 'app-add-context-pack',
  templateUrl: './add-context-pack.component.html',
  styleUrls: ['./add-context-pack.component.scss']
})
export class AddContextPackComponent implements OnInit {

  addContextPackForm: FormGroup;

  wordList: WordList;

  addWordListValidationMessages = {
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

  constructor(private fb: FormBuilder, private wordListService: WordListService, private snackBar: MatSnackBar, private router: Router) {
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
      ]))
    });

  }

  ngOnInit() {
    this.createForms();
  }

  submitForm() {
    this.wordListService.addWordList(this.addContextPackForm.value).subscribe(newID => {
      this.snackBar.open('Added Wordlist ' + this.addContextPackForm.value.name, null, {
        duration: 2000,
      });
      this.router.navigate(['/wordlists/', newID]);
    }, err => {
      this.snackBar.open('Failed to add the wordlist to context pack', 'OK', {
        duration: 5000,
      });
    });
  }

}
