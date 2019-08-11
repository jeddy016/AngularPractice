import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../shared/event.service';
import { IEvent, ISession } from '../shared/event.model';

@Component({
    templateUrl: './event-details.component.html',
    styles: [`
        .container { padding: 0 20px; }
        .event-image { height: 100px !important; }
        a { cursor: pointer; }
    `]
})

export class EventDetailsComponent implements OnInit {
    event: IEvent;
    addMode: boolean;
    filterBy = 'all';
    sortBy = 'votes';

    constructor(private eventService: EventService, private route: ActivatedRoute) {}

    ngOnInit() {
        const eventId = +this.route.snapshot.params['id'];
        this.event = this.eventService.getEvent(eventId);
    }

    addSession() {
        this.addMode = true;
    }

    saveNewSession(session: ISession) {
        const maxId = Math.max.apply(null, this.event.sessions.map(s => s.id));

        session.id = maxId + 1;
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event);
        this.addMode = false;
    }

    cancelAddSession() {
        this.addMode = false;
     }
}
