import { Component, OnInit } from '@angular/core';
import {TagService} from "../../service/tag.service";
import {Tag} from "../../model/tag.model";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  current: Tag;
  tags: Tag[] = [];

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.tagService.getTags().subscribe(
      tags => this.tags = tags
    );
  }

}
