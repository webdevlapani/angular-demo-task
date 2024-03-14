import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { GraphqlService } from 'src/app/core/services/graphql.service';
import { MOCK_DATA } from 'src/app/mock-data/public.api';
import { DashboardComponent } from './dashboard.component';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let graphqlService : GraphqlService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports:[NgbNav,DashboardComponent, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    graphqlService = TestBed.inject(GraphqlService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    expect(component.breadCrumbItems).toBeUndefined();
    expect(component.page).toBe(1);
    expect(component.startIndex).toBe(1);
    expect(component.endIndex).toBe(8);
    expect(component.pageSize).toBe(8);
    expect(component.people).toBeUndefined();
    expect(component.collectionSize).toBeUndefined();
  });

  it('it should call getPeople from graphqlService and get the data', async () => {
    const MOCK_BREADCRUMB = [
      { label: 'Contacts' },
      { label: 'User Grid', active: true },
    ];
    await component.ngOnInit();
    spyOn(graphqlService, 'getAllPeopleData').and.callFake(() => Promise.resolve(MOCK_DATA));
    expect(component.people).toEqual(MOCK_DATA?.data?.allPeople?.people);
    expect(component.breadCrumbItems).toEqual(MOCK_BREADCRUMB);
  });

  it('should render contact list title with count', () => {
    component.people = [{}, {}, {}];
    fixture.detectChanges();
    const TITLE_ELEMENT: HTMLElement = fixture.nativeElement.querySelector('.card-title');
    expect(TITLE_ELEMENT.textContent).toContain('Contact List');
    expect(TITLE_ELEMENT.textContent).toContain('(3)');
  });

  it('should render correct navigation links', () => {
    const NAV_LINKS = fixture.nativeElement.querySelectorAll('.nav-link');
    expect(NAV_LINKS.length).toEqual(2);
    expect(NAV_LINKS[0].getAttribute('routerLink')).toEqual('/apps/user-list');
    expect(NAV_LINKS[1].getAttribute('routerLink')).toEqual('/apps/user-grid');
  });

  it('should render pagination component', () => {
    const PAGINATION_ELEMENT = fixture.nativeElement.querySelector('ngb-pagination');
    expect(PAGINATION_ELEMENT).toBeTruthy();
  });


  it('should render default avatar if person image is not provided', () => {
    component.people = [{ name: 'Jane', designation: 'Designer' }];
    fixture.detectChanges();
    const AVATAR_ELEMENT = fixture.nativeElement.querySelector('.avatar-title');
    expect(AVATAR_ELEMENT).toBeTruthy();
  });

  it('should render correct info message with people count', () => {
    component.people = [{}, {}, {}];
    component.startIndex = 1;
    component.endIndex = 3;
    fixture.detectChanges();
    const INFO_ELEMENT: HTMLElement = fixture.nativeElement.querySelector('#tickets-table_info');
    expect(INFO_ELEMENT.textContent).toContain('Showing 1 - 3 of 3');
  });

  it('should update startIndex and endIndex correctly when page changes', () => {
    component.people = [{}, {}, {}, {}, {}];
    component.pageSize = 2;
    component.onPageChange(2);
    expect(component.startIndex).toEqual(3);
    expect(component.endIndex).toEqual(4);
  });

  it('should update endIndex if it exceeds the length of people array', () => {
    component.people = [{}, {}, {}, {}];
    component.pageSize = 3;
    component.onPageChange(2);
    expect(component.startIndex).toEqual(4);
    expect(component.endIndex).toEqual(4);
  });

});
