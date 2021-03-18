import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CtxPk } from './context-pack';
import { CtxPkService } from './context-pack.service';

@Component({
  selector: 'app-context-pack-profile',
  templateUrl: './context-pack-profile.component.html',
  styleUrls: ['./context-pack-profile.component.scss']
})
export class ContextPackProfileComponent implements OnInit, OnDestroy {

  ctxPk: CtxPk;
  id: string;
  getCtxPkSub: Subscription;

  constructor(private route: ActivatedRoute, private ctxPkService: CtxPkService) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      if (this.getCtxPkSub) {
        this.getCtxPkSub.unsubscribe();
      }
      this.getCtxPkSub = this.ctxPkService.getCtxPkById(this.id).subscribe(ctxPk => this.ctxPk = ctxPk);
    });
  }

  ngOnDestroy(): void {
    if (this.getCtxPkSub) {
      this.getCtxPkSub.unsubscribe();
    }
  }

}
