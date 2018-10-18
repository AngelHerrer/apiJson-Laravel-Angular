<?php

namespace App\Http\Controllers\API;

use App\Employee;
use App\Http\Controllers\Controller;
use Debugbar;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $employee = Employee::paginate(3);
            return response()->success($employee);
        } catch (Exception $e) {
            Debugbar::addThrowable($e);
            return response()->exception($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
//            $this->validate($request, [
//                'nombre' => 'required',
//                'email' => 'required',
//            ]);
            
            $employee = Employee::create($request->all());
//            var_dump($employee);
//            die();
            if ($request->hasFile('image')) {
                $image           = $request->file('image');
                $name            = time() . '.' . $image->getClientOriginalExtension();
                $destinationPath = public_path('/employee');
                $image->move($destinationPath, $name);
                $employee->image = url('/') . '/employee/' . $name;
                $employee->save();
            }
            if ($employee) {
                return response()->success($employee, 200);
            } else {
                return response()->error($employee, 400);
            }
        } catch (Exception $e) {
            Debugbar::addThrowable($e);
            return response()->exception($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $employee = Employee::find($id);
            return response()->success($employee);
        } catch (Exception $e) {
            Debugbar::addThrowable($e);
            return response()->exception($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            /*$employee              = new Employee;
            $employee->author      = $request->input('author');
            $employee->description = $request->input('description');
            $employee->save();*/
            $employee = Employee::findorFail($id);
            $employee = $employee->update($request->all());
            return response()->success($employee);
        } catch (Exception $e) {
            Debugbar::addThrowable($e);
            return response()->exception($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $employee = Employee::find($id);
            $res  = $employee->delete();
            return response()->success($res);
        } catch (Exception $e) {
            Debugbar::addThrowable($e);
            return response()->exception($e->getMessage(), $e->getCode());
        }
    }
}
