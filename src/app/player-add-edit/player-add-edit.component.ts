import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
@Component({
  selector: 'app-player-add-edit',
  templateUrl: './player-add-edit.component.html',
  styleUrls: ['./player-add-edit.component.scss']
})
export class PlayerAddEditComponent {
  playerForm: FormGroup;

  position: string[] = [
    'Goalkeeper'
    'Centre-Back'
    'Midfielder'
    'Winger'
    'Centre-Foward'
  ];
}

constructor(
  private _fb: FormBuilder,
  private _formService: PlayerService,
  private _dialogRef: MatDialogRef<PlayerAddEditComponent>,
  @Inject _coreService: CoreService
  private _coreService: CoreService
) {
  this.playerForm = this._fb.group({
    name: '',
    age: '',
    nationality: '',
    contract: '',
    position: '',
  });

  ngOnInit(): void {
    this.playerForm.patchValue(this.data);
  }
}

onFormSubmit() {
  if (this.playerForm.valid) {
    if (this.data) {
      this._playerService
        .updatePlayer(this.data.id, this.playerForm.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Player details updated!');
            alert('Player detail updated!')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    }

  } else {
    this.playerService.addPlayer(this.playerForm.value).subscribe({
      next: (value: any) => {
        this._coreService.openSnackBar('Player added successfully!');
        this._dialogRef.close(true)
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}