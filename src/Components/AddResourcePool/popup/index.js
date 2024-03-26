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
import { addStepperValue } from "@/Context/AddNewProjectSlice/addProjectSlice";

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
                setIsCheckboxChecked(data.map(pm => checkboxData.includes(pm.emp_id)));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const dispatch = useDispatch();

    var handleResourcesAdd = (emp_id, data) => {

        dispatch(addResources({ id: emp_id, }));
        console.log(emp_id, data);
    };

    const [selectedDataPM, setSelectedDataPM] = useState([]);
    const handleAddResourcesPM = (data) => {
        const newData = [...selectedDataPM, data];
        setSelectedDataPM(newData);
        dispatch(addResourcesPM(newData));
    };
    const Data = useSelector((state) => state.addResources)
    const checkboxData = Data.ProjectManager
    console.log(checkboxData);
    const EditButton = useSelector((state) => state.addProject.ProjectStepperValue)
    useEffect(() => {
        if (EditButton === "1") {
            setIsCheckboxChecked(prevState => prevState.map(() => true)),
                dispatch(addStepperValue(""))
        }
    }, [EditButton]);


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
                                            onClick={(e) => {
                                                const isChecked = e.target.checked;
                                                const selectedId = Manager.emp_id;
                                                if (isChecked) {
                                                    handleResourcesAdd(selectedId);
                                                    handleAddResourcesPM(selectedId); // Add resource to PM list
                                                } else {
                                                    // Handle deselection: remove data and update PM list
                                                    const updatedSelectedData = selectedDataPM.filter(id => id !== selectedId);
                                                    setSelectedDataPM(updatedSelectedData);
                                                    dispatch(addResourcesPM(updatedSelectedData));
                                                }
                                                if (isChecked) {
                                                    const selectedData = {
                                                        id: Manager.emp_id,
                                                        name: Manager.resource_name,
                                                        email: Manager.work_email,
                                                        image: Manager.image,
                                                        Designation:"Project Manager",
                                                        isChecked: true
                                                    };
                                                    dispatch(addResourcesData(selectedData))
                                                } else {
                                                    const selectedData = {
                                                        id: Manager.emp_id,
                                                        isChecked: false
                                                    };
                                                    dispatch(addResourcesData(selectedData))
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
                setIsCheckboxChecked(data.map(pm => checkboxData.includes(pm.emp_id)));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // HandleCheckBoxChanges
    const dispatch = useDispatch();
    var handleResourcesAdd = (emp_id) => {
        dispatch(addResources({ id: emp_id, }));
        console.log(emp_id);
    };
    const [selectedDataApiD, setSelectedDataApiD] = useState([]);

    const handleAddResourcesApiDeveloper = (data) => {
        const newData = [...selectedDataApiD, data];
        setSelectedDataApiD(newData);
        dispatch(addResourcesApiDeveloper(newData));
    };
    const Data = useSelector((state) => state.addResources)
    const checkboxData = Data.APIDeveloper
    console.log(checkboxData);
    const EditButton = useSelector((state) => state.addProject.ProjectStepperValue)
    useEffect(() => {
        if (EditButton === "1") {
            // Logic to update checkbox states based on shouldNavigateToSecondPage
            // For example, you might want to check all checkboxes
            setIsCheckboxChecked(prevState => prevState.map(() => true)),
                dispatch(addStepperValue(""))
        }
    }, [EditButton]);
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
                                                onClick={(e) => {
                                                    const isChecked = e.target.checked;
                                                    const selectedId = Manager.emp_id;
                                                    if (isChecked) {
                                                        handleResourcesAdd(selectedId);
                                                        handleAddResourcesApiDeveloper(selectedId);
                                                    } else {
                                                        const updatedSelectedData = selectedDataApiD.filter(id => id !== selectedId);
                                                        setSelectedDataApiD(updatedSelectedData);
                                                        dispatch(addResourcesApiDeveloper(updatedSelectedData));
                                                    }
                                                    if (isChecked) {
                                                        const selectedData = {
                                                            id: Manager.emp_id,
                                                            name: Manager.resource_name,
                                                            email: Manager.work_email,
                                                            image: Manager.image,
                                                            Designation:"API Developer",
                                                            isChecked: true
                                                        };
                                                        dispatch(addResourcesData(selectedData))
                                                    } else {
                                                        const selectedData = {
                                                            id: Manager.emp_id,
                                                            isChecked: false
                                                        };
                                                        dispatch(addResourcesData(selectedData))
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
    var handleResourcesAdd = (emp_id) => {
        dispatch(addResources({ id: emp_id, }));
        console.log(emp_id, data);
    };
    const [selectedDataCiCd, setSelectedDataCiCd] = useState([]);


    const handleAddResourcesCiCd = (data) => {
        const newData = [...selectedDataCiCd, data];
        setSelectedDataCiCd(newData);
        dispatch(addResourcesCiCd(newData));
    };
    const Data = useSelector((state) => state.addResources)
    const checkboxData = Data.CICDSpecialist
    console.log(checkboxData);
    const EditButton = useSelector((state) => state.addProject.ProjectStepperValue)
    useEffect(() => {
        if (EditButton === "1") {
            // Logic to update checkbox states based on shouldNavigateToSecondPage
            // For example, you might want to check all checkboxes
            setIsCheckboxChecked(prevState => prevState.map(() => true))
                ,
                dispatch(addStepperValue(""))

        }
    }, [EditButton]);


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
                setIsCheckboxChecked(data.map(pm => checkboxData.includes(pm.emp_id)));
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
                                            onClick={(e) => {
                                                const selectedId = Manager.emp_id;
                                                const isChecked = e.target.checked;

                                                if (isChecked) {
                                                    handleResourcesAdd(selectedId);
                                                    handleAddResourcesCiCd(selectedId);
                                                } else {
                                                    // Handle deselecting the checkbox
                                                    const updatedSelectedData = selectedDataCiCd.filter(id => id !== selectedId);
                                                    setSelectedDataCiCd(updatedSelectedData);
                                                    dispatch(addResourcesCiCd(updatedSelectedData));
                                                }
                                                if (isChecked) {
                                                    const selectedData = {
                                                        id: Manager.emp_id,
                                                        name: Manager.resource_name,
                                                        email: Manager.work_email,
                                                        image: Manager.image,
                                                        Designation:"CI/CD Developer",
                                                        isChecked: true
                                                    };
                                                    dispatch(addResourcesData(selectedData))
                                                } else {
                                                    const selectedData = {
                                                        id: Manager.emp_id,
                                                        isChecked: false
                                                    };
                                                    dispatch(addResourcesData(selectedData))
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
    var handleResourcesAdd = (emp_id) => {
        dispatch(addResources({ id: emp_id, }));
        console.log(emp_id);
    };
    const [selectedDataTester, setSelectedDataTester] = useState([]);

    const handleAddResourcesTester = (data) => {
        const newData = [...selectedDataTester, data];
        setSelectedDataTester(newData);
        dispatch(addResourcesTester(newData));
    };
    const Data = useSelector((state) => state.addResources)
    const checkboxData = Data.Tester
    console.log(checkboxData);
    const EditButton = useSelector((state) => state.addProject.ProjectStepperValue)
    useEffect(() => {
        if (EditButton === "1") {
            // Logic to update checkbox states based on shouldNavigateToSecondPage
            // For example, you might want to check all checkboxes
            setIsCheckboxChecked(prevState => prevState.map(() => true))
                ,
                dispatch(addStepperValue(""))

        }
    }, [EditButton]);
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
                setIsCheckboxChecked(data.map(pm => checkboxData.includes(pm.emp_id)));
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
                                            onClick={(e) => {
                                                const isChecked = e.target.checked;
                                                const selectedId = Manager.emp_id;
                                                if (isChecked) {
                                                    handleResourcesAdd(selectedId);
                                                    handleAddResourcesTester(selectedId);
                                                } else {
                                                    // Handle deselecting the checkbox
                                                    const updatedSelectedData = selectedDataTester.filter(id => id !== selectedId);
                                                    setSelectedDataTester(updatedSelectedData);
                                                    dispatch(addResourcesTester([updatedSelectedData]));
                                                }
                                                if (isChecked) {
                                                    const selectedData = {
                                                        id: Manager.emp_id,
                                                        name: Manager.resource_name,
                                                        email: Manager.work_email,
                                                        image: Manager.image,
                                                        Designation:"Tester",
                                                        isChecked: true
                                                    };
                                                    dispatch(addResourcesData(selectedData))
                                                } else {
                                                    const selectedData = {
                                                        id: Manager.emp_id,
                                                        isChecked: false
                                                    };
                                                    dispatch(addResourcesData(selectedData))
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
    var handleResourcesAdd = (emp_id) => {
        dispatch(addResources({ id: emp_id }));
        console.log(emp_id);
    };
    const [selectedDataUxDesign, setSelectedDataUxDesign] = useState([]);
    const handleAddResourcesUxDesigner = (data) => {
        const newData = [...selectedDataUxDesign, data];
        setSelectedDataUxDesign(newData);
        dispatch(addResourcesUxDesigner(newData));
    };
    const Data = useSelector((state) => state.addResources)
    const checkboxData = Data.UXDesigner
    console.log(checkboxData);
    const EditButton = useSelector((state) => state.addProject.ProjectStepperValue)
    useEffect(() => {
        if (EditButton === "1") {
            // Logic to update checkbox states based on shouldNavigateToSecondPage
            // For example, you might want to check all checkboxes
            setIsCheckboxChecked(prevState => prevState.map(() => true))
                ,
                dispatch(addStepperValue(""))

        }
    }, [EditButton]);

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
                setIsCheckboxChecked(data.map(pm => checkboxData.includes(pm.emp_id)));
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
                                                        onClick={(e) => {
                                                            const isChecked = e.target.checked;
                                                            const selectedId = Manager.emp_id;
                                                            if (isChecked) {
                                                                handleResourcesAdd(selectedId);
                                                                handleAddResourcesUxDesigner(selectedId);
                                                            } else {
                                                                // Handle deselecting the checkbox
                                                                const updatedSelectedData = selectedDataUxDesign.filter(id => id !== selectedId);
                                                                setSelectedDataUxDesign(updatedSelectedData);
                                                                dispatch(addResourcesUxDesigner(updatedSelectedData));
                                                            }
                                                            if (isChecked) {
                                                                const selectedData = {
                                                                    id: Manager.emp_id,
                                                                    name: Manager.resource_name,
                                                                    email: Manager.work_email,
                                                                    image: Manager.image,
                                                                    Designation:"Ux Designer",
                                                                    isChecked: true
                                                                };
                                                                dispatch(addResourcesData(selectedData))
                                                            } else {
                                                                const selectedData = {
                                                                    id: Manager.emp_id,
                                                                    isChecked: false
                                                                };
                                                                dispatch(addResourcesData(selectedData))
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
                                </div>
                            </div>
                        </div>
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
    var handleResourcesAdd = (emp_id) => {
        dispatch(addResources({ id: emp_id, }));
        console.log(emp_id);
    };
    const [selectedDataUiDeveloper, setSelectedDataUiDeveloper] = useState([]);

    const handleAddResourcesUiDeveloper = (data) => {
        const newData = [...selectedDataUiDeveloper, data];
        setSelectedDataUiDeveloper(newData);
        dispatch(addResourcesUiDeveloper(newData));
    };
    const Data = useSelector((state) => state.addResources)
    const checkboxData = Data.UIDeveloper
    console.log(checkboxData);
    const EditButton = useSelector((state) => state.addProject.ProjectStepperValue)
    useEffect(() => {
        if (EditButton === "1") {
            // Logic to update checkbox states based on shouldNavigateToSecondPage
            // For example, you might want to check all checkboxes
            setIsCheckboxChecked(prevState => prevState.map(() => true))
                ,
                dispatch(addStepperValue(""))

        }
    }, [EditButton]);
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
                setIsCheckboxChecked(data.map(pm => checkboxData.includes(pm.emp_id)));
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
                                            onClick={(e) => {
                                                const isChecked = e.target.checked;
                                                const selectedId = Manager.emp_id;
                                                if (isChecked) {
                                                    handleResourcesAdd(selectedId);
                                                    handleAddResourcesUiDeveloper(selectedId);
                                                } else {
                                                    // Handle deselecting the checkbox
                                                    const updatedSelectedData = selectedDataUiDeveloper.filter(id => id !== selectedId);
                                                    setSelectedDataUiDeveloper(updatedSelectedData);
                                                    dispatch(addResourcesUiDeveloper(updatedSelectedData));
                                                }
                                                if (isChecked) {
                                                    const selectedData = {
                                                        id: Manager.emp_id,
                                                        name: Manager.resource_name,
                                                        email: Manager.work_email,
                                                        image: Manager.image,
                                                        Designation:"Ui Developer",
                                                        isChecked: true
                                                    };
                                                    dispatch(addResourcesData(selectedData))
                                                } else {
                                                    const selectedData = {
                                                        id: Manager.emp_id,
                                                        isChecked: false
                                                    };
                                                    dispatch(addResourcesData(selectedData))
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
                setIsCheckboxChecked(data.map(pm => checkboxData.includes(pm.emp_id)));
                setuxResearcher(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const dispatch = useDispatch();

    console.log(selectUser);
    var handleResourcesAdd = (emp_id) => {
        dispatch(addResources({ id: emp_id, }));
        console.log(emp_id);
    };

    const [selectedDataUxResearch, setSelectedDataUxResearch] = useState([]);

    const handleAddResourcesUxResearch = (data) => {
        const newData = [...selectedDataUxResearch, data];
        setSelectedDataUxResearch(newData);
        dispatch(addResourcesUxResearch(newData));
    };
    const Data = useSelector((state) => state.addResources)
    const checkboxData = Data.UXResearcher
    console.log(checkboxData);
    const EditButton = useSelector((state) => state.addProject.ProjectStepperValue)
    useEffect(() => {
        if (EditButton === "1") {
            // Logic to update checkbox states based on shouldNavigateToSecondPage
            // For example, you might want to check all checkboxes
            setIsCheckboxChecked(prevState => prevState.map(() => true))
                ,
                dispatch(addStepperValue(""))

        }
    }, [EditButton]);
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
                                            onClick={(e) => {
                                                const isChecked = e.target.checked;
                                                const selectedId = Manager.emp_id;
                                                if (isChecked) {
                                                    handleResourcesAdd(selectedId);
                                                    handleAddResourcesUxResearch(selectedId);
                                                } else {
                                                    // Handle deselecting the checkbox
                                                    const updatedSelectedData = selectedDataUxResearch.filter(id => id !== selectedId);
                                                    setSelectedDataUxResearch(updatedSelectedData);
                                                    dispatch(addResourcesUxResearch(updatedSelectedData));
                                                }
                                                if (isChecked) {
                                                    const selectedData = {
                                                        id: Manager.emp_id,
                                                        name: Manager.resource_name,
                                                        email: Manager.work_email,
                                                        image: Manager.image,
                                                        Designation:"Ux Researcher",
                                                        isChecked: true
                                                    };
                                                    dispatch(addResourcesData(selectedData))
                                                } else {
                                                    const selectedData = {
                                                        id: Manager.emp_id,
                                                        isChecked: false
                                                    };
                                                    dispatch(addResourcesData(selectedData))
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
                    </div>
                </div>
            </div>
        </div>
    );
};