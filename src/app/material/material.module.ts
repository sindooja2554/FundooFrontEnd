import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {DragDropModule} from '@angular/cdk/drag-drop';

// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {DatePipe} from '@angular/common'
// import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    LayoutModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatGridListModule,
    DragDropModule
    // MatDatepickerModule,
    
    // MatToolbarModule
    // MatSnackBar
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    LayoutModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatGridListModule,
    DragDropModule
    // MatDatepickerModule, 
  ],
  providers: [
    // DatePipe
  ],
})
export class MaterialModule { }
