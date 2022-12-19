import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moments';
import { MessagesService } from 'src/app/services/messages.service';
import { MommentService } from 'src/app/services/momment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit{
      btnText='Compartilhar!';

      constructor(
        private mommentService: MommentService,
        private router: Router,
        private messagesService: MessagesService
      ) {}

      ngOnInit(): void {
        
      }

      async createHandler(moment:Moment){
         const formData = new FormData()

         formData.append('title', moment.title);
         formData.append('description',moment.description);

         if(moment.image){
          formData.append('image',moment.image);
         }

         await this.mommentService.createMoment(formData).subscribe();

         this.messagesService.add("Momento adicionado com sucesso");
      
         this.router.navigate(['/']);
      
      }


}
