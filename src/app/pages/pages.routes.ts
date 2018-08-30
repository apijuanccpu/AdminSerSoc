import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';

import { ProfileComponent } from './profile/profile.component';


import { LoginGuardGuard } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PersonesComponent } from './persones/persones.component';
import { PersonaComponent } from './persones/persona.component';
import { InformesComponent } from './informes/informes.component';
import { InformeComponent } from './informes/informe.component';
import { LocalitzadorComponent } from './localitzador/localitzador.component';
import { NotificacionsComponent } from './notificacions/notificacions.component';
import { GestioInformesComponent } from './gestio-informes/gestio-informes.component';
import { PeticionsComponent } from './peticions/peticions.component';
import { PeticioComponent } from './peticions/peticio.component';



const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ LoginGuardGuard ],
        data: { titulo: 'Dashboard' }
    },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de treballador/professional' } },
            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Treballadors / Professionals' } },
            { path: 'persones', component: PersonesComponent, data: { titulo: 'Mantenimiento dUsuaris' } },
            { path: 'persona/:dni?/:dnipers?', component: PersonaComponent, data: { titulo: 'Actualització dUsuaris' } },
            { path: 'informes', component: InformesComponent, data: { titulo: 'Mantenimiento de Informes' } },
            { path: 'informe/:id?/:idpers?', component: InformeComponent, data: { titulo: 'Actualització dInforme' } },
            { path: 'peticions', component: PeticionsComponent, data: { titulo: 'Mantenimiento de Peticions' } },
            { path: 'peticio/:id', component: PeticioComponent, data: { titulo: 'Actualització de Peticio' } },
            // { path: 'informe/persona/:id', component: InformeComponent, data: { titulo: 'Actualització dInforme' } },
            { path: 'localitzador', component: LocalitzadorComponent, data: { titulo: 'Consulta dUsuaris' } },
            { path: 'notificacions', component: NotificacionsComponent, data: { titulo: 'Notificacions' } },
            { path: 'gestioinformes', component: GestioInformesComponent, data: { titulo: 'Gestions Informes' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
