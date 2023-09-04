import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { addEmployeeData } from '../services/RestApiServices/Service';

/* eslint-disable-next-line */
export interface AddEmployeeFormProps { }

interface IEmployeeFormValues {
  firstName: string;
  middleName: string;
  lastName: string;
}

const validationSchema: ZodType<IEmployeeFormValues> = z.object({
  firstName: z.string().min(1, { message: 'User Name is required' }),
  middleName: z.string(),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
});

export function AddEmployeeForm(props: AddEmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployeeFormValues>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IEmployeeFormValues> = async (data) => {
    const result = await addEmployeeData(data).then(response => console.log("response", response))
      .catch(error => console.log("error", error));
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">Add Employee</h3>
              </div>
              <div className="box-body">
                <div className="row">
                  <div className="col-md-8">
                    <div className="container">
                      <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
                        <h1>Add Employee</h1>
                        <div
                          className={`${errors.firstName ? 'input-control error' : 'input-control'
                            }`}
                        >
                          <label htmlFor="firstName">User Name</label>
                          <input
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            {...register('firstName')}
                          />
                          {errors.firstName && (
                            <p className="error">{errors.firstName?.message}</p>
                          )}
                        </div>
                        <div
                          className={`${errors.middleName ? 'input-control error' : 'input-control'
                            }`}
                        >
                          <label htmlFor="middleName">Middle Name</label>
                          <input
                            id="middleName"
                            type="text"
                            placeholder="Middle Name"
                            {...register('middleName')}
                          />
                          {errors.middleName && (
                            <p className="error">{errors.middleName?.message}</p>
                          )}
                        </div>
                        <div
                          className={`${errors.lastName ? 'input-control error' : 'input-control'
                            }`}
                        >
                          <label htmlFor="lastName">Last Name</label>
                          <input
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                            {...register('lastName')}
                          />
                          {errors.lastName && (
                            <p className="error">{errors.lastName?.message}</p>
                          )}
                        </div>

                        <button type="submit">Add Employee</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-footer">
                <div className="row">
                  <div className="col-sm-3 col-xs-6">
                    <div className="description-block border-right">
                      <span className="description-percentage text-green">
                        <i className="fa fa-caret-up"></i> 17%
                      </span>
                      <h5 className="description-header">$35,210.43</h5>
                      <span className="description-text">TOTAL REVENUE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>


  );
}

export default AddEmployeeForm;
