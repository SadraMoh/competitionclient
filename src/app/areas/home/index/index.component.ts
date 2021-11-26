import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    // apply sky background-image
    document.body.classList.add('sky');
  }

  ngOnDestroy(): void {
    // remove sky background-image
    document.body.classList.remove('sky');
  }

}
