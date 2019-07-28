import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { EventsAppComponent } from './events-app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { CreateEventComponent } from './events/create-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventService } from './events/shared/event.service';
import { NavbarComponent } from './nav/navbar.component';
import { ToastrService } from './common/toastr.service';
import { appRoutes } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    NavbarComponent
  ],
  providers: [
    EventService,
    ToastrService
  ],
  bootstrap: [EventsAppComponent]
})

export class AppModule { }
