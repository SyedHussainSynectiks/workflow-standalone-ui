"use client";
import api from "@/api";
import React from "react";
import { useState, useEffect } from "react";
import useProject from "@/HOC/Project/Project";
import user from "../../../../public/assets/user.png"
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

// import user from "../../../../public/assets/profile1.svg";
// import { useDispatch } from "react-redux";
import {
    addResources, addResourcesData, addResourcesPMLength,
    addResourcesUxDesignerLength,
    addResourcesUiDeveloperLength,
    addResourcesApiDeveLength,
    addResourcesTesterLength,
    addResourcesUxResearcherLength,
    CICDSpecialistLength, addResourcesPM, addResourcesUxDesigner, addResourcesUiDeveloper, addResourcesApiDeveloper, addResourcesTester, addResourcesUxResearch, addResourcesCiCd
} from "@/Context/AddresourcesSlice/addresourcesSlice";

export const Projectmanager = (props) => {
    // All Hooks
    const [projectResource, setprojectResource] = useState({
        resourcePool: [
            {
                projectManager: [],
            },
        ],
    });

    // project
    const [projectManager, setprojectManager] = useState([]);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(projectManager.map(() => false));


    // select User
    const [selectUser, setSelectUser] = useState([]);
    console.log(selectUser);
    // useEffect to fetch all users
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await api.get("/get_resource_by_role", {
                    params: {
                        designation: "Project Manager",
                    },
                });
                console.log(response.data);
                const data = response.data;
                dispatch(addResourcesPMLength(data.length));

                console.log(data.length)
                setprojectManager(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const dispatch = useDispatch();

    var handleResourcesAdd = (emp_id, data) => {
        dispatch(addResources({ id: emp_id, }));

        dispatch(addResourcesData(data));
        console.log(emp_id, data);
    };
    var handleResourcesInfo = (pm) => {
        dispatch(addResourcesData(pm))
    }
    const [selectedDataPM, setSelectedDataPM] = useState([]);
    const handleAddResourcesPM = (data) => {
        const newData = [...selectedDataPM, data];
        setSelectedDataPM(newData);
        dispatch(addResourcesPM(newData));
    };


    return (
        <div className="flex flex-col gap-4 bg-white w-[100%]">
            <div className="w-[100%] px-2 flex justify-center rounded">
                <div className=" w-[100%] ">
                    {/* Project Manager useState Hook Data Map */}
                    <div className="flex flex-col gap-6">
                        {/* Display a static UI without mapping */}
                        {projectManager.map((Manager, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${isCheckboxChecked[index] ? 'border-blue-400 border-solid' : ''
                                    } `}
                            >
                                <div className="flex items-center gap-6 pl-3 w-[100%] py-3">
                                    <div>
                                        {/* CheckBox Button */}
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                const selectedId = Manager.emp_id;
                                                const selectedData = { name: Manager.resource_name, email: Manager.work_email, image: Manager.image };
                                                handleResourcesAdd(selectedId, selectedData);

                                                const isChecked = e.target.checked;
                                                const empId = Manager.emp_id;
                                                if (isChecked) {
                                                    handleAddResourcesPM(empId);
                                                } else {
                                                    // Handle deselecting the checkbox
                                                    const updatedSelectedData = selectedDataPM.filter(id => id !== empId);
                                                    setSelectedDataPM(updatedSelectedData);
                                                    dispatch(addResourcesPM(updatedSelectedData));
                                                }
                                                setIsCheckboxChecked(prevState => {
                                                    const newState = [...prevState];
                                                    newState[index] = isChecked;
                                                    return newState;
                                                });
                                            }}
                                            checked={isCheckboxChecked[index]}

                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Image src={Manager.image ? Manager.image : user} height={35} width={35} />
                                        <div>
                                            <h1 className={`text-sm leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-bold' : ''} `}>
                                                {Manager.resource_name}
                                                <span className={` ml-1 ${isCheckboxChecked[index] ? 'text-blue-300' : ''}`}>{Manager.work_email}</span>
                                            </h1>
                                            <h3 className={`text-sm  leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-normal' : ''}`}>{Manager.designation}</h3>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                        {/* Repeat the above structure for each item you want to display */}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Api Developer
export const ApiDeveloper = (props) => {
    // All Hooks
    // const handleResourcesAdd = (emplyyId) => {
    //   dispatch(addResources({ id: emplyyId }));
    // console.log("dispatch",emplyyId)
    // if (emplyyId) {
    //   console.log("If-Else -dispatch", emplyyId);
    //   ;
    // } else {
    //   console.error("empId is undefined");
    // }
    // dispatch(addResources({id:emplyyId}));

    // API Developer
    const [apiDeveloper, setApiDeveloper] = useState([]);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(apiDeveloper.map(() => false));


    // select User
    // useEffect to fetch all API Developers
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await api.get("/get_resource_by_role", {
                    params: {
                        designation: "API Developer",
                    },
                });
                console.log(response.data);
                const data = response.data;
                dispatch(addResourcesApiDeveLength(data.length));
                setApiDeveloper(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // HandleCheckBoxChanges
    const dispatch = useDispatch();
    var handleResourcesAdd = (emp_id, data) => {
        dispatch(addResources({ id: emp_id, }));

        dispatch(addResourcesData(data));
        console.log(emp_id, data);
    };
    const [selectedDataApiD, setSelectedDataApiD] = useState([]);

    const handleAddResourcesApiDeveloper = (data) => {
        const newData = [...selectedDataApiD, data];
        setSelectedDataApiD(newData);
        dispatch(addResourcesApiDeveloper(newData));
    };
    return (
        <div className="flex flex-col gap-4 bg-white w-[100%]">
            <div className="w-[100%] px-2 flex justify-center rounded">
                <div className=" w-[100%] ">
                    {/* Project Manager useState Hook Data Map */}
                    <div className="flex flex-col gap-6">
                        {/* Display a static UI without mapping */}

                        {apiDeveloper.map((Manager, index) => {
                            console.log("employ_id", Manager.emp_id);
                            console.log(apiDeveloper)
                            return (
                                <div
                                    key={index}
                                    className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${isCheckboxChecked[index] ? 'border-blue-400 border-solid' : ''
                                        } `}
                                >
                                    <div className="flex items-center gap-6 pl-3 w-[100%] py-3">
                                        <div>
                                            {/* CheckBox Button */}
                                            <input
                                                type="checkbox"
                                                onChange={(e) => {
                                                    const selectedId = Manager.emp_id;
                                                    const selectedData = { name: Manager.resource_name, email: Manager.work_email, image: Manager.image };
                                                    handleResourcesAdd(selectedId, selectedData);

                                                    const isChecked = e.target.checked;
                                                    const empId = Manager.emp_id;
                                                    if (isChecked) {
                                                        handleAddResourcesApiDeveloper(empId);
                                                    } else {
                                                        // Handle deselecting the checkbox
                                                        const updatedSelectedData = selectedDataApiD.filter(id => id !== empId);
                                                        setSelectedDataApiD(updatedSelectedData);
                                                        dispatch(addResourcesApiDeveloper(updatedSelectedData));
                                                    }
                                                    setIsCheckboxChecked(prevState => {
                                                        const newState = [...prevState];
                                                        newState[index] = isChecked;
                                                        return newState;
                                                    });
                                                }}
                                                checked={isCheckboxChecked[index]}

                                                className="cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Image src={Manager.image ? Manager.image : user} height={35} width={35} />
                                            <div>
                                                <h1 className={`text-sm leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-bold' : ''} `}>
                                                    {Manager.resource_name}
                                                    <span className={` ml-1 ${isCheckboxChecked[index] ? 'text-blue-300' : ''}`}>{Manager.work_email}</span>
                                                </h1>
                                                <h3 className={`text-sm  leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-normal' : ''}`}>{Manager.designation}</h3>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                        {/* Repeat the above structure for each item you want to display */}
                    </div>
                </div>
            </div>
        </div>
    );
};

// cicd
export const CiCdResourcePool = (props) => {
    const [CiCd, setCiCd] = useState([]);
    const [selectUser, setSelectUser] = useState([]);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(CiCd.map(() => false));


    // useProject
    const [project, setProject] = useProject({
        resourcePool: [
            {
                cicd: [],
            },
        ],
    });

    // handleSelectionAndCLose
    const handleSelectionAndClose = () => {
        // console.log(selectUser);

        setProject((prevProject) => {
            const updatedResourcePool = [
                {
                    cicid: selectUser,
                },
            ];
            return {
                ...prevProject,
                resourcePool: updatedResourcePool,
            };
        });

        props.onSubmit();
    };

    // HandleCheckBoxChange
    // var handleResourcesAdd = (emp_id) => {
    //   dispatch(addResources({ id: emp_id }));

    //   console.log(emp_id);
    // };
    // var handleResourcesInfo = (CiCd) => {
    //   dispatch(addResourcesData(CiCd))
    // }
    var handleResourcesAdd = (emp_id, data) => {
        dispatch(addResources({ id: emp_id, }));

        dispatch(addResourcesData(data));
        console.log(emp_id, data);
    };
    const [selectedDataCiCd, setSelectedDataCiCd] = useState([]);


    const handleAddResourcesCiCd = (data) => {
        const newData = [...selectedDataCiCd, data];
        setSelectedDataCiCd(newData);
        dispatch(addResourcesCiCd(newData));
    };


    // console.log(project);

    // useEffect to fetch all users
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await api.get("/get_resource_by_role", {
                    params: {
                        designation: "CI/CD",
                    },
                });

                console.log(response.data);
                const data = response.data;
                dispatch(CICDSpecialistLength(data.length));
                setCiCd(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 bg-white w-[100%]">
            <div className="w-[100%] px-2 flex justify-center rounded">
                <div className=" w-[100%] ">
                    {/* Project Manager useState Hook Data Map */}
                    <div className="flex flex-col gap-6">
                        {/* Display a static UI without mapping */}
                        {CiCd.map((Manager, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${isCheckboxChecked[index] ? 'border-blue-400 border-solid' : ''
                                    } `}
                            >
                                <div className="flex items-center gap-6 pl-3 w-[100%] py-3">
                                    <div>
                                        {/* CheckBox Button */}
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                const selectedId = Manager.emp_id;
                                                const selectedData = { name: Manager.resource_name, email: Manager.work_email, image: Manager.image };
                                                handleResourcesAdd(selectedId, selectedData);

                                                const isChecked = e.target.checked;
                                                const empId = Manager.emp_id;
                                                if (isChecked) {
                                                    handleAddResourcesCiCd(empId);
                                                } else {
                                                    // Handle deselecting the checkbox
                                                    const updatedSelectedData = selectedDataCiCd.filter(id => id !== empId);
                                                    setSelectedDataCiCd(updatedSelectedData);
                                                    dispatch(addResourcesCiCd(updatedSelectedData));
                                                }
                                                setIsCheckboxChecked(prevState => {
                                                    const newState = [...prevState];
                                                    newState[index] = isChecked;
                                                    return newState;
                                                });
                                            }}
                                            checked={isCheckboxChecked[index]}

                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Image src={Manager.image ? Manager.image : user} height={35} width={35} />
                                        <div>
                                            <h1 className={`text-sm leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-bold' : ''} `}>
                                                {Manager.resource_name}
                                                <span className={` ml-1 ${isCheckboxChecked[index] ? 'text-blue-300' : ''}`}>{Manager.work_email}</span>
                                            </h1>
                                            <h3 className={`text-sm  leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-normal' : ''}`}>{Manager.designation}</h3>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                        {/* Repeat the above structure for each item you want to display */}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Tester
export const TesterResourcePool = (props) => {
    const [Tester, setTester] = useState([]);
    const [selectUser, setSelectUser] = useState([]);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(Tester.map(() => false));


    // useProject
    const [projectResource, setprojectResource] = useState({
        Tester: [],
    });

    // HandleCheckBoxChange

    // console.log(selectUser);
    // var handleResourcesAdd = (emp_id ) => {
    //   setSelectUser (emp_id)
    //   dispatch(addResources({ id: (selectUser) }));

    //   console.log(emp_id);
    // };
    // var handleResourcesInfo = (Tester) =>{
    //   console.log(Tester.emp_id)
    //   console.log(selectUser)
    //   if (selectUser ===  Tester.emp_id){
    //   dispatch(addResourcesData(Tester))
    //   }
    //   else{
    //     console.log(" notDispached")
    //   }
    // }
    var handleResourcesAdd = (emp_id, data) => {
        dispatch(addResources({ id: emp_id, }));

        dispatch(addResourcesData(data));
        console.log(emp_id, data);
    };
    const [selectedDataTester, setSelectedDataTester] = useState([]);

    const handleAddResourcesTester = (data) => {
        const newData = [...selectedDataTester, data];
        setSelectedDataTester(newData);
        dispatch(addResourcesTester(newData));
    };
    //   const selectedId = emp_id;
    //   console.log(selectedId)
    //   // Agar selected ID hai toh resources ko dispatch karein
    //   dispatch(addResourcesData({ id: selectedId }));
    // };


    // const handleResourcesAdd = (emp_id) => {

    //   setprojectResource((prevState) => ({
    //     ...prevState,
    //     Tester: [...prevState.Tester, emp_id],
    //   }));
    //   dispatch(addResources({ id: projectResource }));
    // };
    // const handleResourcesAdd = (emp_id) => {
    //   console.log(emp_id);
    //   // Check if the employee ID is already in the Tester array
    //   const isChecked = projectResource.Tester.includes(emp_id);

    //   if (isChecked) {
    //     // If already checked, remove it
    //     setprojectResource((prevState) => ({
    //       ...prevState,
    //       Tester: prevState.Tester.filter((id) => id !== emp_id),
    //     }));
    //   } else {
    //     // If not checked, add it
    //     setprojectResource((prevState) => ({
    //       ...prevState,
    //       Tester: [...prevState.Tester, emp_id],
    //     }));
    //   }
    //   // Dispatch the updated Tester array
    // };

    // console.log(projectResource);

    // console.log(project);

    // useEffect to fetch all users
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await api.get("/get_resource_by_role", {
                    params: {
                        designation: "Tester",
                    },
                });
                console.log(response.data);
                const data = response.data;
                dispatch(addResourcesTesterLength(data.length));

                setTester(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    var dispatch = useDispatch();


    return (
        <div className="flex flex-col gap-4 bg-white w-[100%]">
            <div className="w-[100%] px-2 flex justify-center rounded">
                <div className=" w-[100%] ">
                    {/* Project Manager useState Hook Data Map */}
                    <div className="flex flex-col gap-6">
                        {/* Display a static UI without mapping */}
                        {Tester.map((Manager, index) => (

                            <div
                                key={index}
                                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${isCheckboxChecked[index] ? 'border-blue-400 border-solid' : ''
                                    } `}
                            >
                                <div className="flex items-center gap-6 pl-3 w-[100%] py-3">
                                    <div>
                                        {/* CheckBox Button */}
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                const selectedId = Manager.emp_id;
                                                const selectedData = { name: Manager.resource_name, email: Manager.work_email, image: Manager.image };
                                                handleResourcesAdd(selectedId, selectedData);

                                                const isChecked = e.target.checked;
                                                const empId = Manager.emp_id;
                                                if (isChecked) {
                                                    handleAddResourcesTester(empId);
                                                } else {
                                                    // Handle deselecting the checkbox
                                                    const updatedSelectedData = selectedDataTester.filter(id => id !== empId);
                                                    setSelectedDataTester(updatedSelectedData);
                                                    dispatch(addResourcesTester([updatedSelectedData]));
                                                }
                                                setIsCheckboxChecked(prevState => {
                                                    const newState = [...prevState];
                                                    newState[index] = isChecked;
                                                    return newState;
                                                });
                                            }}
                                            checked={isCheckboxChecked[index]}

                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Image src={Manager.image ? Manager.image : user} height={35} width={35} />
                                        <div>
                                            <h1 className={`text-sm leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-bold' : ''} `}>
                                                {Manager.resource_name}
                                                <span className={` ml-1 ${isCheckboxChecked[index] ? 'text-blue-300' : ''}`}>{Manager.work_email}</span>
                                            </h1>
                                            <h3 className={`text-sm  leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-normal' : ''}`}>{Manager.designation}</h3>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                        {/* Repeat the above structure for each item you want to display */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const UxDesignResourcePool = (props) => {
    // /get_resource_by_role

    const [uxDesigner, setUxDesigners] = useState([]);
    const [selectUser, setSelectUser] = useState([]);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(uxDesigner.map(() => false));


    // useProject
    const [project, setProject] = useProject({
        resourcePool: [
            {
                uiDesigner: [],
            },
        ],
    });

    // HandleCheckBoxChange
    var handleResourcesAdd = (emp_id, data) => {
        dispatch(addResources({ id: emp_id, }));

        dispatch(addResourcesData(data));
        console.log(emp_id, data);
    };
    const [selectedDataUxDesign, setSelectedDataUxDesign] = useState([]);
    const handleAddResourcesUxDesigner = (data) => {
        const newData = [...selectedDataUxDesign, data];
        setSelectedDataUxDesign(newData);
        dispatch(addResourcesUxDesigner(newData));
    };

    console.log(selectUser);

    // console.log(project);

    // useEffect to fetch all users
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await api.get("/get_resource_by_role", {
                    params: {
                        designation: "UI Designer",
                    },
                });
                console.log(response.data);
                const data = response.data;
                dispatch(addResourcesUxDesignerLength(data.length));

                setUxDesigners(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 bg-white w-[100%]">
            <div className="w-[100%] px-2 flex justify-center rounded">
                <div className="rounded-lg bg-white shadow-md w-[100%] border border-gray-200 border-t-0">
                    {/* Project Manager useState Hook Data Map */}
                    <div>
                        {/* Display a static UI without mapping */}
                        <div className="flex items-center justify-start py-6 pr-4 pl-4 gap-40">
                            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
                                <div className="flex flex-col gap-6">
                                    {/* Display a static UI without mapping */}
                                    {uxDesigner.map((Manager, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${isCheckboxChecked[index] ? 'border-blue-400 border-solid' : ''
                                                } `}
                                        >
                                            <div className="flex items-center gap-6 pl-3 w-[100%] py-3">
                                                <div>
                                                    {/* CheckBox Button */}
                                                    <input
                                                        type="checkbox"
                                                        onChange={(e) => {
                                                            const selectedId = Manager.emp_id;
                                                            const selectedData = { name: Manager.resource_name, email: Manager.work_email, image: Manager.image };
                                                            handleResourcesAdd(selectedId, selectedData);
                                                            const isChecked = e.target.checked;
                                                            const empId = Manager.emp_id;
                                                            if (isChecked) {
                                                                handleAddResourcesUxDesigner(empId);
                                                            } else {
                                                                // Handle deselecting the checkbox
                                                                const updatedSelectedData = selectedDataUxDesign.filter(id => id !== empId);
                                                                setSelectedDataUxDesign(updatedSelectedData);
                                                                dispatch(addResourcesUxDesigner(updatedSelectedData));
                                                            }
                                                        }}
                                                        className="cursor-pointer"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Image src={Manager.image ? Manager.image : user} height={35} width={35} />
                                                    <div>
                                                        <h1 className={`text-sm leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-bold' : ''} `}>
                                                            {Manager.resource_name}
                                                            <span className={` ml-1 ${isCheckboxChecked[index] ? 'text-blue-300' : ''}`}>{Manager.work_email}</span>
                                                        </h1>
                                                        <h3 className={`text-sm  leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-normal' : ''}`}>{Manager.designation}</h3>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                    {/* Repeat the above structure for each item you want to display */}
                                </div>
                            </div>
                        </div>
                        {/* Repeat the above structure for each item you want to display */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const UiDeveloperResourcePool = (props) => {
    const [uiDeveloper, setuiDeveloper] = useState([]);
    const [selectUser, setSelectUser] = useState([]);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(uiDeveloper.map(() => false));


    // useProject
    const [project, setProject] = useProject({
        resourcePool: [
            {
                uiDeveloper: [],
            },
        ],
    });

    // HandleCheckBoxChange
    var handleResourcesAdd = (emp_id, data) => {
        dispatch(addResources({ id: emp_id, }));

        dispatch(addResourcesData(data));
        console.log(emp_id, data);
    };
    const [selectedDataUiDeveloper, setSelectedDataUiDeveloper] = useState([]);

    const handleAddResourcesUiDeveloper = (data) => {
        const newData = [...selectedDataUiDeveloper, data];
        setSelectedDataUiDeveloper(newData);
        dispatch(addResourcesUiDeveloper(newData));
    };
    console.log(selectUser);



    // console.log(project);

    // useEffect to fetch all users
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await api.get("/get_resource_by_role", {
                    params: {
                        designation: "UI Developer",
                    },
                });
                console.log(response.data);
                const data = response.data;
                dispatch(addResourcesUiDeveloperLength(data.length));

                setuiDeveloper(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-4 bg-white w-[100%]">
            <div className="w-[100%] px-2 flex justify-center rounded">
                <div className=" w-[100%] ">
                    {/* Project Manager useState Hook Data Map */}
                    <div className="flex flex-col gap-6">
                        {/* Display a static UI without mapping */}
                        {uiDeveloper.map((Manager, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${isCheckboxChecked[index] ? 'border-blue-400 border-solid' : ''
                                    } `}
                            >
                                <div className="flex items-center gap-6 pl-3 w-[100%] py-3">
                                    <div>
                                        {/* CheckBox Button */}
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                const selectedId = Manager.emp_id;
                                                const selectedData = { name: Manager.resource_name, email: Manager.work_email, image: Manager.image };
                                                handleResourcesAdd(selectedId, selectedData);

                                                const isChecked = e.target.checked;
                                                const empId = Manager.emp_id;
                                                if (isChecked) {
                                                    handleAddResourcesUiDeveloper(empId);
                                                } else {
                                                    // Handle deselecting the checkbox
                                                    const updatedSelectedData = selectedDataUiDeveloper.filter(id => id !== empId);
                                                    setSelectedDataUiDeveloper(updatedSelectedData);
                                                    dispatch(addResourcesUiDeveloper(updatedSelectedData));
                                                }
                                                setIsCheckboxChecked(prevState => {
                                                    const newState = [...prevState];
                                                    newState[index] = isChecked;
                                                    return newState;
                                                });
                                            }}
                                            checked={isCheckboxChecked[index]}

                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Image src={Manager.image ? Manager.image : user} height={35} width={35} />
                                        <div>
                                            <h1 className={`text-sm leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-bold' : ''} `}>
                                                {Manager.resource_name}
                                                <span className={` ml-1 ${isCheckboxChecked[index] ? 'text-blue-300' : ''}`}>{Manager.work_email}</span>
                                            </h1>
                                            <h3 className={`text-sm  leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-normal' : ''}`}>{Manager.designation}</h3>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                        {/* Repeat the above structure for each item you want to display */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const UxResearcher = (props) => {
    const [uxResearcher, setuxResearcher] = useState([]);
    const [selectUser, setSelectUser] = useState([]);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(uxResearcher.map(() => false));


    // useProject
    const [project, setProject] = useProject({
        resourcePool: [
            {
                uxResearcher: [],
            },
        ],
    });

    // HandleCheckBoxChange
    // const handleCheckboxChange = (userId) => {
    //   // Check if userId is already in selectUser
    //   if (selectUser.includes(userId)) {
    //     // If yes, remove it
    //     setSelectUser((prevState) => prevState.filter((id) => id !== userId));
    //   } else {
    //     // If no, add it
    //     setSelectUser((prevState) => [...prevState, userId]);
    //   }
    // };



    // console.log(project);

    // useEffect to fetch all users
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await api.get("/get_resource_by_role", {
                    params: {
                        designation: "Ux Researcher",
                    },
                });
                console.log(response.data);
                const data = response.data;
                dispatch(addResourcesUxResearcherLength(data.length));

                setuxResearcher(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const dispatch = useDispatch();

    console.log(selectUser);
    var handleResourcesAdd = (emp_id, data) => {
        dispatch(addResources({ id: emp_id, }));

        dispatch(addResourcesData(data));
        console.log(emp_id, data);
    };

    const [selectedDataUxResearch, setSelectedDataUxResearch] = useState([]);

    const handleAddResourcesUxResearch = (data) => {
        const newData = [...selectedDataUxResearch, data];
        setSelectedDataUxResearch(newData);
        dispatch(addResourcesUxResearch(newData));
    };
    return (
        <div className="flex flex-col gap-4 bg-white w-[100%]">
            <div className="w-[100%] px-2 flex justify-center rounded">
                <div className=" w-[100%] ">
                    {/* Project Manager useState Hook Data Map */}
                    <div className="flex flex-col gap-6">
                        {/* Display a static UI without mapping */}
                        {uxResearcher.map((Manager, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border rounded-lg ${isCheckboxChecked[index] ? 'border-blue-400 border-solid' : ''
                                    } `}
                            >
                                <div className="flex items-center gap-6 pl-3 w-[100%] py-3">
                                    <div>
                                        {/* CheckBox Button */}
                                        <input
                                            type="checkbox"
                                            onChange={(e) => {
                                                const selectedId = Manager.emp_id;
                                                const selectedData = { name: Manager.resource_name, email: Manager.work_email, image: Manager.image };
                                                handleResourcesAdd(selectedId, selectedData);

                                                const isChecked = e.target.checked;
                                                const empId = Manager.emp_id;
                                                if (isChecked) {
                                                    handleAddResourcesUxResearch(empId);
                                                } else {
                                                    // Handle deselecting the checkbox
                                                    const updatedSelectedData = selectedDataUxResearch.filter(id => id !== empId);
                                                    setSelectedDataUxResearch(updatedSelectedData);
                                                    dispatch(addResourcesUxResearch(updatedSelectedData));
                                                }
                                                setIsCheckboxChecked(prevState => {
                                                    const newState = [...prevState];
                                                    newState[index] = isChecked;
                                                    return newState;
                                                });
                                            }}
                                            checked={isCheckboxChecked[index]}

                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Image src={Manager.image ? Manager.image : user} height={35} width={35} />
                                        <div>
                                            <h1 className={`text-sm leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-bold' : ''} `}>
                                                {Manager.resource_name}
                                                <span className={` ml-1 ${isCheckboxChecked[index] ? 'text-blue-300' : ''}`}>{Manager.work_email}</span>
                                            </h1>
                                            <h3 className={`text-sm  leading-tight tracking-normal text-left ${isCheckboxChecked[index] ? 'font-normal' : ''}`}>{Manager.designation}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Repeat the above structure for each item you want to display */}
                    </div>
                </div>
            </div>
        </div>
    );
};