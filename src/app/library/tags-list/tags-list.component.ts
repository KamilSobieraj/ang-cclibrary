import {Component, OnDestroy, OnInit} from '@angular/core';
import {TagsService} from './tags.service';
import {takeUntil} from 'rxjs/operators';
import {componentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit, OnDestroy {
  tags: {};
  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.tagsService.getBooksSortedByTags()
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe(tagsWithBooks => this.tags = tagsWithBooks);
  }

  ngOnDestroy(): void {
    // ! need to be called (even empty) for componentDestroyed(this) to work
  }
}
