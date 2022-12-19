import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { MommentService } from 'src/app/services/momment.service';

import { Moment } from 'src/app/Moments';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';


import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit{

  moment?: Moment;
  baseApiUrl="http://localhost:3333/";

  faTimes = faTimes;
  faEdit = faEdit;

  
  constructor(
    private momentService: MommentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) {}


  ngOnInit(): void {
    const id=Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item)=>(this.moment=item.data))
  }
  async removeHandler(id: number) {
    if (id) {
      await this.momentService.removeMoment(id).subscribe();

      this.messagesService.add(`Momento excluído com sucesso!`);

      this.router.navigate(['/']);
    }
  }

}
