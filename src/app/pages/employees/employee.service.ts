import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmployee } from 'src/app/shared/model/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Observable<IEmployee[]> | undefined;
  private employeesCollection: AngularFirestoreCollection<IEmployee>;

  constructor(private readonly afs: AngularFirestore) { 
    this.employeesCollection = afs.collection<IEmployee>('employees');
    this.getEmployees();
  }

  onDeleteEmployee(empId: string): Promise<void> {
    return new Promise(async (resolve,reject) => {
      try {
        const result = await this.employeesCollection.doc(empId).delete();
        resolve(result);
      } catch (error) {
        reject(error.message)
      }
    })
  }

  onSaveEmployee(employee: IEmployee, empId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = empId || this.afs.createId();
        const data = { id, ...employee };
        const result = await this.employeesCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    })
  }

  private getEmployees(): void {
    this.employees = this.employeesCollection?.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as IEmployee))
    )
  }

  
}
