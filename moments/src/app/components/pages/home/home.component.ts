import { Component, OnInit } from '@angular/core';

import { MommentService } from 'src/app/services/momment.service';

import { Moment } from 'src/app/Moments';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  allMoments: Moment[]=[];
  moments: Moment[]=[];
  baseApiUrl="http://localhost:3333/";

  faSearch=faSearch;
  searchTerm:string='';

  constructor( private momentService: MommentService){

  }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMoments = items.data;
      this.moments = items.data;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) =>
      moment.title.toLowerCase().includes(value)
    );
  }

}
