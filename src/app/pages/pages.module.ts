
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ModalUploadFileComponent } from '../components/modal-upload/modal-upload-file.component';
import { PersonesComponent } from './persones/persones.component';
import { PersonaComponent } from './persones/persona.component';
import { InformesComponent } from './informes/informes.component';
import { InformeComponent } from './informes/informe.component';
import { SimplePdfViewerModule } from 'simple-pdf-viewer';
import { NotificacionsComponent } from './notificacions/notificacions.component';
import { LocalitzadorComponent } from './localitzador/localitzador.component';
import { GestioInformesComponent } from './gestio-informes/gestio-informes.component';
import { PeticionsComponent } from './peticions/peticions.component';
import { PeticioComponent } from './peticions/peticio.component';
import { CartescitacioComponent } from './cartescitacio/cartescitacio.component';
import { EmpresesComponent } from './empreses/empreses.component';
import { CartacitacioComponent } from './cartescitacio/cartacitacio.component';
import { EmpresaComponent } from './empreses/empresa.component';
// import { InformeComponent } from './informes/informe.component';



@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        AccoutSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        // ModalUploadFileComponent,
        PersonesComponent,
        PersonaComponent,
        InformesComponent,
        InformeComponent,
        LocalitzadorComponent,
        NotificacionsComponent,
        GestioInformesComponent,
        PeticionsComponent,
        PeticioComponent,
        CartescitacioComponent,
        EmpresesComponent,
        CartacitacioComponent,
        EmpresaComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule,
        SimplePdfViewerModule
        // PdfViewerModule,
        // BrowserModule
    ]
})
export class PagesModule { }

