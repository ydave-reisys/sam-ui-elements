import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamHierarchicalComponent } from './hierarchical.component';
import { TreeMode, HierarchicalTreeSelectedItemModel } from '../hierarchical-tree-selectedItem.model';
import { SamHiercarchicalServiceInterface, SearchByTextResult } from '../hierarchical-interface';
import { FormsModule } from '@angular/forms';
import { SamHierarchicalAutocompleteComponent } from '../autocomplete/autocomplete.component';
import { SamHierarchicalSelectedResultComponent } from '../selected-result/selected-result.component';
import { SamModalModule } from '../../../components/modal';
import { SamHierarchicalConfiguration } from '../models/SamHierarchicalConfiguration';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/of';

describe('SamHierarchicalComponent', () => {
  let component: SamHierarchicalComponent;
  let fixture: ComponentFixture<SamHierarchicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SamHierarchicalComponent, SamHierarchicalAutocompleteComponent, SamHierarchicalSelectedResultComponent],
      imports: [FormsModule, SamModalModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamHierarchicalComponent);
    component = fixture.componentInstance;

    component.configuration = new SamHierarchicalConfiguration();


    component.model = new HierarchicalTreeSelectedItemModel();
    component.service = new HierarchicalDataService();
    component.configuration.keyField = 'id';
    component.configuration.id = 'autocomplete1';
    component.configuration.labelText = 'Autocomplete 1';
    component.configuration.valueProperty = 'name';
    component.configuration.subValueProperty = 'subtext';
    component.configuration.placeHolderText = "Enter text";
    component.configuration.modalTitle = "Advanced Lookup";
    component.model.treeMode = TreeMode.SINGLE;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});


export class HierarchicalDataService implements SamHiercarchicalServiceInterface {

  getDataByText(currentItems: number, searchValue?: string): Observable<SearchByTextResult> {
    let itemIncrease = 25;
    let data = Observable.of(SampleHierarchicalData);
    let itemsOb: Observable<Object[]>;
    if (searchValue) {
      itemsOb = data.map(items => items.filter(itm =>
        (itm.name.indexOf(searchValue) !== -1 ||
          itm.subtext.indexOf(searchValue) !== -1
        )));
    } else {
      itemsOb = data;
    }
    let items: object[];
    itemsOb.subscribe(
      (result) => {
        items = result;
      }
    );
    let totalItemCount = items.length;

    let maxSectionPosition = currentItems + itemIncrease;
    if (maxSectionPosition > totalItemCount) {
      maxSectionPosition = totalItemCount;
    }
    let subItemsitems = items.slice(currentItems, maxSectionPosition);

    let returnItem = {
      items: subItemsitems,
      totalItems: totalItemCount
    };
    return Observable.of(returnItem);
  }

  getHiercarchicalById(id?: string) {
    return null;
  }

}

export let SampleHierarchicalData = [
  { 'id': '1', 'parentId': null, 'name': 'Level 1', 'subtext': 'id 1', 'type': 'Level 1' },
  { 'id': '2', 'parentId': '1', 'name': 'Level 2', 'subtext': 'id 2', 'type': 'Level 2' },
  { 'id': '3', 'parentId': '2', 'name': 'Level 3', 'subtext': 'id 3', 'type': 'Level 3' },
  { 'id': '4', 'parentId': '3', 'name': 'Level 4', 'subtext': 'id 4', 'type': 'Level 4' },
  { 'id': '5', 'parentId': '4', 'name': 'Level 5', 'subtext': 'id 5', 'type': 'Level 5' },
  { 'id': '6', 'parentId': '5', 'name': 'Level 6', 'subtext': 'id 6', 'type': 'Level 6' },
  { 'id': '7', 'parentId': '6', 'name': 'Level 7', 'subtext': 'id 7', 'type': 'Level 7' },
  { 'id': '8', 'parentId': '5', 'name': 'Level 6', 'subtext': 'id 8', 'type': 'Level 6' },
  { 'id': '9', 'parentId': '8', 'name': 'Level 7', 'subtext': 'id 9', 'type': 'Level 7' },
  { 'id': '10', 'parentId': '8', 'name': 'Level 7', 'subtext': 'id 10', 'type': 'Level 7' },
  { 'id': '11', 'parentId': '5', 'name': 'Level 6', 'subtext': 'id 11', 'type': 'Level 6' }

];