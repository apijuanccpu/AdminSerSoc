import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Consultes', url: '/localitzador' },
        { titulo: 'Peticions', url: '/peticions' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Treballadors / Professionals', url: '/usuarios' },
        { titulo: 'Usuaris', url: '/persones' },
        { titulo: 'Informes', url: '/informes' },
        { titulo: 'Cartes', url: '/cartescitacio' },
        { titulo: 'Empreses', url: '/empreses' }
      ]
    },
    {
      titulo: 'LListats',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Informes-Gestio', url: '/gestioinformes' },
        { titulo: 'Persones', url: '/persones' },
        { titulo: 'Informes', url: '/informes' }
      ]
    }
  ];

  constructor() { }

}
