import { Component, OnInit } from '@angular/core';

import {
  FilterPaginateVal
} from 'src/app/core/pipes/filter.paginate.pipe';
import { GraphqlService } from 'src/app/core/services/graphql.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
/**
 *  Dashboard Component
 */
export class DashboardComponent implements OnInit {
  public breadCrumbItems!: Array<{}>;
  public page: number = 1;
  public startIndex: number = 1;
  public endIndex: number = 8;
  public pageSize: number = 8;
  public people!: any[];
  public filmData!: any;
  public fieldData!: any;
  public collectionSize!: number;
  public tableData: any;
  public selectedField: string = '';
  public paginateValue: FilterPaginateVal = {
    filter: [],
    localSearch: '',
    itemsPerPage: 5,
    currentPage: 1,
    filterCount: { count: 0 },
    clearFilter: false,
    showFilter: false,
  };
  constructor(private graphqlService: GraphqlService) {}

  ngOnInit() {
    this.getFieldData();
    // this.collectionSize = this.people.length;
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Grid View', active: true },
    ];
  }

  async getFieldData() {
    const getFieldsData = await this.graphqlService.getFields('Root');
    this.fieldData = getFieldsData.data.__type.fields.filter(
      (field: any) => field.name.includes('all') && !field.name.includes('node')
    );
  }

  async getFieldsDropDownData(event: any) {
    const fieldName = event.target.value;
    let Data;
    this.tableData = [];
    switch (fieldName) {
      case 'allPeople':
        Data = await this.graphqlService.getAllPeople();
        this.tableData = this.filterTableData(Data.data.allPeople.people);
        this.paginateValue.filterCount.count = this.tableData.length;
        this.selectedField = 'All Peoples';
        break;
      case 'allFilms':
        Data = await this.graphqlService.getAllFilms();
        this.tableData = this.filterTableData(Data.data.allFilms.films);
        this.paginateValue.filterCount.count = this.tableData.length;
        this.selectedField = 'All Films';
        break;
      case 'allPlanets':
        Data = await this.graphqlService.getAllPlanets();
        this.tableData = this.filterTableData(Data.data.allPlanets.planets);
        this.paginateValue.filterCount.count = this.tableData.length;
        this.selectedField = 'All Planets';
        break;
      case 'allSpecies':
        Data = await this.graphqlService.getAllSpecies();
        this.tableData = this.filterTableData(Data.data.allSpecies.species);
        this.paginateValue.filterCount.count = this.tableData.length;
        this.selectedField = 'All Species';
        break;
      case 'allStarships':
        Data = await this.graphqlService.getAllStarships();
        this.tableData = this.filterTableData(Data.data.allStarships.starships);
        this.paginateValue.filterCount.count = this.tableData.length;
        this.selectedField = 'All Starships';
        break;
      case 'allVehicles':
        Data = await this.graphqlService.getAllVehicles();
        this.tableData = this.filterTableData(Data.data.allVehicles.vehicles);
        this.paginateValue.filterCount.count = this.tableData.length;
        this.selectedField = 'All Vehicles';
        break;
    }
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  filterTableData(data: any) {
    if (data && data.length) {
      return data.map((data: any) => {
        const { __typename, ...mappedData } = data;
        return { ...mappedData };
      });
    }
  }
}
