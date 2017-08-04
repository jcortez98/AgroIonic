import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { PreguntaPage } from '../pregunta/pregunta'



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PreguntaPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
