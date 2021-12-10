import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  content: string = '';

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {

    this.configService.aboutText()
      .subscribe(
        res => {
          this.content = res.value;
        }
      )

  }

}
