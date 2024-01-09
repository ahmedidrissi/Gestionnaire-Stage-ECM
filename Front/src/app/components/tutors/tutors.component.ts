import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TutorsService } from '../../services/tutors.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutors',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './tutors.component.html',
  styleUrl: './tutors.component.css',
})
export class TutorsComponent implements OnInit {
  tutorForm = new FormGroup({
    // tutorNumber: new FormControl(1),
    firstName: new FormControl('Ahmed'),
    lastName: new FormControl('Idrissi'),
    gender: new FormControl('M'),
    tutorPhoneNumber: new FormControl('0654321098'),
  });

  displayedColumns: string[] = [
    'Numéro du Tuteur',
    'Prénom',
    'Nom',
    'Sexe',
    'Téléphone du Tuteur',
  ];

  tutorsList: any[] = [];
  editMode = false;
  currentTutorNumber: number = 0;

  constructor(
    private tutorsService: TutorsService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTutors();
  }

  getTutors() {
    return this.tutorsService.getTutors().subscribe({
      next: (data: any) => {
        this.tutorsList = data;
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  handleSearch(event: any) {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord) {
      this.tutorsList = this.tutorsList.filter((tutor) => {
        return (
          tutor.firstName.toLowerCase().includes(keyWord) ||
          tutor.lastName.toLowerCase().includes(keyWord)
        );
      });
    }
  }

  handleTutorForm() {
    if (this.editMode) {
      this.updateTutor();
    } else {
      this.addTutor();
    }
  }

  handleUpdateTutor(tutor: any) {
    this.editMode = true;
    this.currentTutorNumber = tutor.tutorNumber;
    this.tutorForm.patchValue(tutor);
  }

  addTutor() {
    if (this.tutorForm.valid) {
      this.tutorsService.addTutor(this.tutorForm.value).subscribe({
        next: (data) => {
          this.getTutors();
        },
        error: (err) => {
          if (err.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
    } else {
      console.log('Invalid form');
    }
  }

  updateTutor() {
    if (this.tutorForm.valid) {
      this.tutorsService
        .updateTutor(this.currentTutorNumber, this.tutorForm.value)
        .subscribe({
          next: (data) => {
            this.getTutors();
            this.editMode = false;

          },
          error: (err) => {
            if (err.status === 403) {
              this.tokenStorageService.logout();
            }
          },
        });
    } else {
      console.log('Invalid form');
    }
  }

  deleteTutor(tutorNumber: number) {
    this.tutorsService.deleteTutor(tutorNumber).subscribe({
      next: (data) => {
        this.getTutors();
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }
}