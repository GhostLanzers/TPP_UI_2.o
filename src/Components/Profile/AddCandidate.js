import * as React from "react";
import {
  Grid,
  Button,
  BottomNavigation,
  Container,
  Card,
  CardHeader,
  CardContent,
  TextField,
  MenuItem,
  Autocomplete,
  Chip,
  Divider,
  Radio,
  FormControlLabel,
  RadioGroup,
  Collapse,
  alpha,
} from "@mui/material";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCandidate(props) {
  const navigate = useNavigate();
  const access = !["Recruiter", "Teamlead", "Intern"].includes(
    props.user.employeeType
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/company/companyType?companyType=Empanelled",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        const extraRes = await axios.get(
          "http://localhost:5000/api/v1/extra/all",
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );

        setCompaniesList(res.data);
        extraRes.data.forEach(({ _id, data }) => {
          if (_id === "Skills") setSkillsList(data);
          else if (_id === "Locations") setLocationList(data);
          else if (_id === "Qualifications") setQualificationList(data);
          else if (_id === "Languages") setLanguageList(data);
          else if (_id === "Language Level") setlanguageLevelList(data);
          else if (_id === "L1&L2") setAssessment(data);
          else if (_id === "Interview Status") setInterviewStatus(data);
          else if (_id === "Select") setSelect(data);
        });
      } catch (error) {}
    };
    fetchData();
  }, []);

  const [nameError, setNameError] = React.useState(false);
  const [numberError, setNumberError] = React.useState(false);

  const [companiesList, setCompaniesList] = React.useState([]);
  const [rolesList, setRolesList] = React.useState([]);
  const [skillsList, setSkillsList] = React.useState([]);
  const [locationList, setLocationList] = React.useState([]);
  const [qualificationList, setQualificationList] = React.useState([]);
  const [languageList, setLanguageList] = React.useState([]);
  const [expandedCompany, setExpandedCompany] = React.useState(false);
  const [languageLevelList, setlanguageLevelList] = React.useState([]);
  const [assessment, setAssessment] = React.useState([]);
  const [interviewStatus, setInterviewStatus] = React.useState([]);
  const [select, setSelect] = React.useState([]);

  const [candidate, setCandidate] = React.useState({
    fullName: "",
    mobile: [""],
    email: [""],
    homeTown: "",
    currentCity: "",
    qualifications: [
      {
        qualification: "",
        YOP: dayjs(new Date()),
      },
    ],
    languages: [
      {
        language: null,
        level: "",
        remarks: "",
      },
    ],
    skills: [],
    experience: [
      {
        companyName: "",
        role: "",
        salary: 0,
        startDate: dayjs(new Date()),
        endDate: dayjs(new Date()),
        experience: 0,
      },
    ],
    companyId: null,
    roleId: null,
    interviewDate: dayjs(new Date()),
    remarks: "",
    rate: 0,
    interviewStatus: null,
    select: null,
    EMP_ID: "",
    onboardingDate: dayjs(new Date()),
    nextTrackingDate: dayjs(new Date()),
    l1Assessment: "",
    l2Assessment: null,
  });

  const handleExpandCompany = () => {
    setExpandedCompany(!expandedCompany);
  };

  const handleAddCandidate = async () => {
    try {
      var flag = 0;
      if (!candidate.fullName) {
        toast.error("Full Name is Required");
        flag = 1;
      }
      if (candidate.mobile.includes("")) {
        const ind = candidate.mobile.indexOf("");
        toast.error(
          "Missing " +
            (ind == 0
              ? "1st"
              : ind == 1
              ? "2nd"
              : ind == 2
              ? "3rd"
              : ind + 1 + "th") +
            " Mobile Number"
        );
        flag = 1;
      }

      if (!access) {
        if (
          ["TAC", "GOOD"].includes(candidate.l2Assessment) &&
          !candidate.interviewStatus
        ) {
          toast.error("Missing Interview Status");
          flag = 1;
        }
        if (
          ["TAC", "GOOD"].includes(candidate.l2Assessment) &&
          candidate.interviewStatus === "Select" &&
          !candidate.select
        ) {
          toast.error("Missing Select Status");
          flag = 1;
        }
      }
      if (flag) return;
      const newCandidate = await axios.post(
        "http://localhost:5000/api/v1/candidate",
        {
          ...candidate,
          assignedEmployee: props.user.userid,
          createdByEmployee: props.user.userid,
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      const skilldata = await axios.patch(
        "http://localhost:5000/api/v1/extra/skills",
        { data: [...new Set([...candidate.skills, ...skillsList])] },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      toast.success("Candidate Added Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const [warning, setWarning] = React.useState("");
  const checkNumber = async (num) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/candidate/mobile/" + num,

        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      if (res.data.status === true) toast.error("Number already exists");
    } catch (error) {}
  };

  return (
    <>
      <div className="bg">
        <Container sx={{ paddingTop: "9.5vh", width: "96%" }}>
          <Card
            sx={{
              borderRadius: "20px",
              backgroundColor: "transparent",
            }}
          >
            <CardHeader
              style={{
                backgroundColor: alpha("#0B0B0B", 0.1),
                backdropFilter: "blur(60px)",
                color: "white",
              }}
              title="ADD PERSONAL INFORMATION"
            />
            <CardContent sx={{ backgroundColor: alpha("#FFFFFF", 0.8) }}>
              <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid item xs={12}>
                  <TextField
                    id="candiateName"
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={candidate.fullName}
                    inputProps={{
                      pattern: "[A-Za-z ]+",
                    }}
                    onChange={(e) => {
                      setCandidate({ ...candidate, fullName: e.target.value });
                      if (!e.target.validity.valid) {
                        toast.warning(
                          "Only Alphabets and Space allowed in Name!"
                        );
                      }
                    }}
                  />
                </Grid>

                {candidate.mobile.map((x, i) => (
                  <>
                    <Grid item xs={9}>
                      <TextField
                        id="outlined-basic"
                        label="Mobile Number"
                        variant="outlined"
                        value={x}
                        required
                        onChange={(e) => {
                          if (!/^\d*$/.test(e.target.value))
                            toast.warning("Only Number allowed in Mobile");
                          candidate.mobile[i] = e.target.value;
                          setCandidate({
                            ...candidate,
                            mobile: candidate.mobile,
                          });
                        }}
                        onBlur={(e) => {
                          if (!/^\d{10}$/.test(e.target.value)) {
                            if (e.target.value.length == 0) return;
                            toast.warning("Mobile number should be 10 digits");
                            return;
                          }
                          checkNumber(e.target.value);
                        }}
                        fullWidth
                      />
                    </Grid>
                    {i === 0 && (
                      <Grid item xs={3}>
                        <Button
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          size="large"
                          style={{ height: "100%" }}
                          endIcon={<ControlPointIcon />}
                          onClick={() =>
                            setCandidate({
                              ...candidate,
                              mobile: [...candidate.mobile, ""],
                            })
                          }
                        >
                          Add
                        </Button>
                      </Grid>
                    )}
                    {i !== 0 && (
                      <Grid item xs={3}>
                        <Button
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          color="error"
                          size="large"
                          endIcon={<RemoveCircleOutlineIcon />}
                          sx={{ height: "100%" }}
                          onClick={() => {
                            setCandidate({
                              ...candidate,
                              mobile: [...candidate.mobile].filter(
                                (_, indexFilter) => !(indexFilter === i)
                              ),
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </Grid>
                    )}
                  </>
                ))}
                {candidate.email.map((x, i) => (
                  <>
                    <Grid item xs={9}>
                      <TextField
                        id="outlined-basic"
                        label="Email ID"
                        variant="outlined"
                        value={x}
                        onChange={(e) => {
                          candidate.email[i] = e.target.value;
                          setCandidate({
                            ...candidate,
                            email: candidate.email,
                          });
                        }}
                        onBlur={(e) => {
                          if (
                            !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
                              e.target.value
                            )
                          ) {
                            if (e.target.value.length == 0) return;
                            toast.warning("Not a valid Email");
                            return;
                          }
                        }}
                        fullWidth
                      />
                    </Grid>
                    {i === 0 && (
                      <Grid item xs={3}>
                        <Button
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          size="large"
                          style={{ height: "100%" }}
                          endIcon={<ControlPointIcon />}
                          onClick={() =>
                            setCandidate({
                              ...candidate,
                              email: [...candidate.email, ""],
                            })
                          }
                        >
                          Add
                        </Button>
                      </Grid>
                    )}
                    {i !== 0 && (
                      <Grid item xs={3}>
                        <Button
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          color="error"
                          size="large"
                          endIcon={<RemoveCircleOutlineIcon />}
                          sx={{ height: "100%" }}
                          onClick={() => {
                            setCandidate({
                              ...candidate,
                              email: [...candidate.email].filter(
                                (_, indexFilter) => !(indexFilter === i)
                              ),
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </Grid>
                    )}
                  </>
                ))}
                <Grid item xs={6}>
                  <Autocomplete
                    id="candidateHomeTown"
                    options={locationList.map((location) => location)}
                    filterSelectedOptions
                    value={candidate.homeTown}
                    onChange={(e, v) =>
                      setCandidate({
                        ...candidate,
                        homeTown: v,
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Candidate Home Town" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    id="candidateCurrentCity"
                    options={locationList.map((location) => location)}
                    filterSelectedOptions
                    value={candidate.currentCity}
                    onChange={(e, v) =>
                      setCandidate({
                        ...candidate,
                        currentCity: v,
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Candidate Current City" />
                    )}
                  />
                </Grid>
                {candidate.languages.map((x, i) => (
                  <>
                    <Grid item xs={3}>
                      <Autocomplete
                        className="candidateLanguage"
                        options={languageList}
                        getOptionLabel={(option) => option}
                        value={x.language}
                        onChange={(e, v) => {
                          candidate.languages[i].language = v;
                          setCandidate({
                            ...candidate,
                            languages: candidate.languages,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Language" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        className="candidatelevel"
                        select
                        label="Level"
                        value={x.level}
                        onChange={(e) => {
                          candidate.languages[i].level = e.target.value;
                          setCandidate({
                            ...candidate,
                            languages: candidate.languages,
                          });
                        }}
                        fullWidth
                      >
                        {languageLevelList.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="candidateLanguageRemarks"
                        label="Remarks"
                        variant="outlined"
                        value={x.remarks}
                        onChange={(e) => {
                          candidate.languages[i].remarks = e.target.value;
                          setCandidate({
                            ...candidate,
                            languages: candidate.languages,
                          });
                        }}
                        fullWidth
                      />
                    </Grid>
                    {i === 0 && (
                      <Grid item xs={3}>
                        <Button
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          size="large"
                          style={{ height: "100%" }}
                          endIcon={<ControlPointIcon />}
                          onClick={() => {
                            setCandidate({
                              ...candidate,
                              languages: [
                                ...candidate.languages,
                                { language: "", level: "", remarks: "" },
                              ],
                            });
                          }}
                        >
                          Add
                        </Button>
                      </Grid>
                    )}
                    {i !== 0 && (
                      <Grid item xs={3}>
                        <Button
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          color="error"
                          size="large"
                          endIcon={<RemoveCircleOutlineIcon />}
                          sx={{ height: "100%" }}
                          onClick={() => {
                            setCandidate({
                              ...candidate,
                              languages: [...candidate.languages].filter(
                                (_, indexFilter) => !(indexFilter === i)
                              ),
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
              <Divider style={{ marginTop: "4%" }} />
              <Divider>
                <Chip
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(14,0,255,1) 0%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                    color: "white",
                  }}
                  label="EDUCATION INFORMATION"
                  size="large"
                />
              </Divider>
              <Divider style={{ marginBottom: "2%" }} />
              <Grid container rowSpacing={2} columnSpacing={1}>
                {candidate.qualifications.map((x, i) => (
                  <>
                    <Grid item xs={7}>
                      <TextField
                        className="canidateQualification"
                        select
                        label="Select Education"
                        value={x.qualification}
                        onChange={(e) => {
                          candidate.qualifications[i].qualification =
                            e.target.value;
                          setCandidate({
                            ...candidate,
                            qualifications: candidate.qualifications,
                          });
                        }}
                        fullWidth
                      >
                        {qualificationList.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={2}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        fullWidth
                      >
                        <DatePicker
                          label="Year of Passing"
                          views={["year"]}
                          style={{ width: "100%" }}
                          fullWidth
                          onChange={(e) => {
                            candidate.qualifications[i].YOP = e;
                            setCandidate({
                              ...candidate,
                              qualifications: candidate.qualifications,
                            });
                          }}
                          value={x.YOP}
                        />
                      </LocalizationProvider>
                    </Grid>
                    {i === 0 && (
                      <Grid item xs={3}>
                        <Button
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          size="large"
                          style={{ height: "100%" }}
                          endIcon={<ControlPointIcon />}
                          onClick={() => {
                            setCandidate({
                              ...candidate,
                              qualifications: [
                                ...candidate.qualifications,
                                { qualification: "", YOP: dayjs(new Date()) },
                              ],
                            });
                          }}
                        >
                          Add
                        </Button>
                      </Grid>
                    )}
                    {i !== 0 && (
                      <Grid item xs={3}>
                        <Button
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          color="error"
                          size="large"
                          endIcon={<RemoveCircleOutlineIcon />}
                          sx={{ height: "100%" }}
                          onClick={() => {
                            setCandidate({
                              ...candidate,
                              qualifications: [
                                ...candidate.qualifications,
                              ].filter(
                                (_, indexFilter) => !(indexFilter === i)
                              ),
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </Grid>
                    )}
                  </>
                ))}
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    freeSolo
                    id="candidateSkills"
                    options={skillsList.map((skill) => skill)}
                    filterSelectedOptions
                    value={candidate.skills}
                    onChange={(e, v) =>
                      setCandidate({ ...candidate, skills: v })
                    }
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                          <Chip
                            variant="outlined"
                            label={option}
                            key={key}
                            {...tagProps}
                          />
                        );
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Skills" />
                    )}
                  />
                </Grid>
              </Grid>
              <Divider style={{ marginTop: "4%" }} />
              <Divider>
                <Chip
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(14,0,255,1) 0%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                    color: "white",
                  }}
                  label="EXPERIENCE INFORMATION"
                  light
                  size="large"
                />
              </Divider>
              <Divider style={{ marginBottom: "2%" }} />
              <Grid container style={{ margin: "2%" }}>
                <Grid item xs={12}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    defaultValue="FRESHER"
                    name="row-radio-buttons-group"
                    onChange={handleExpandCompany}
                  >
                    <FormControlLabel
                      value="EXPERIENCE"
                      control={<Radio />}
                      label="EXPERIENCE"
                      aria-label="show more"
                    />
                    <FormControlLabel
                      value="FRESHER"
                      control={<Radio />}
                      label="FRESHER"
                      timeout="auto"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Collapse in={expandedCompany} timeout="auto" unmountOnExit>
                <CardContent>
                  <Grid container rowSpacing={2} columnSpacing={1}>
                    {candidate.experience.map((x, i) => {
                      return (
                        <>
                          <Grid item xs={12} />
                          <Grid container rowSpacing={2} columnSpacing={1}>
                            <Grid item xs={6}>
                              <TextField
                                className="candidateCompanyName"
                                label="Comapany Name"
                                variant="outlined"
                                value={x.companyName}
                                onChange={(e) => {
                                  candidate.experience[i].companyName =
                                    e.target.value;
                                  setCandidate({
                                    ...candidate,
                                    experience: candidate.experience,
                                  });
                                }}
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                className="candidateCompanyRole"
                                label="Role"
                                variant="outlined"
                                value={x.role}
                                fullWidth
                                onChange={(e) => {
                                  candidate.experience[i].role = e.target.value;
                                  setCandidate({
                                    ...candidate,
                                    experience: candidate.experience,
                                  });
                                }}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                fullWidth
                              >
                                <DatePicker
                                  label="Start Year"
                                  className="candidateCompanyStartDate"
                                  style={{ width: "100%" }}
                                  fullWidth
                                  value={x.startDate}
                                  onChange={(e) => {
                                    candidate.experience[i].startDate = e;
                                    setCandidate({
                                      ...candidate,
                                      experience: candidate.experience,
                                    });
                                  }}
                                />
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={3}>
                              <LocalizationProvider
                                dateAdapter={AdapterDayjs}
                                fullWidth
                              >
                                <DatePicker
                                  label="End Year"
                                  className="candidateCompanyEndDate"
                                  style={{ width: "100%" }}
                                  fullWidth
                                  value={x.endDate}
                                  onChange={(e) => {
                                    candidate.experience[i].endDate = e;
                                    setCandidate({
                                      ...candidate,
                                      experience: candidate.experience,
                                    });
                                  }}
                                />
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                label="Salary"
                                variant="outlined"
                                className="candidateCompanySalary"
                                fullWidth
                                onChange={(e) => {
                                  candidate.experience[i].salary =
                                    e.target.value;
                                  setCandidate({
                                    ...candidate,
                                    experience: candidate.experience,
                                  });
                                }}
                                value={x.salary}
                              />
                            </Grid>
                          </Grid>
                          <Divider
                            style={{ marginTop: "2%", marginBottom: "2%" }}
                          />
                          {i === 0 && (
                            <>
                              <Grid item xs={9} />
                              <Grid item xs={3}>
                                <Button
                                  fullWidth
                                  margin="normal"
                                  variant="outlined"
                                  size="large"
                                  onClick={() => {
                                    setCandidate({
                                      ...candidate,
                                      experience: [
                                        ...candidate.experience,
                                        {
                                          companyName: "",
                                          role: "",
                                          salary: 0,
                                          startDate: dayjs(new Date()),
                                          endDate: dayjs(new Date()),
                                          experience: 0,
                                        },
                                      ],
                                    });
                                  }}
                                  style={{ height: "100%" }}
                                  endIcon={<ControlPointIcon />}
                                >
                                  Add More
                                </Button>
                              </Grid>
                            </>
                          )}
                          {i !== 0 && (
                            <>
                              <Grid item xs={9} />
                              <Grid item xs={3}>
                                <Button
                                  fullWidth
                                  margin="normal"
                                  variant="outlined"
                                  size="large"
                                  color="error"
                                  onClick={() => {
                                    setCandidate({
                                      ...candidate,
                                      experience: [
                                        ...candidate.experience,
                                      ].filter(
                                        (_, indexFilter) => !(indexFilter === i)
                                      ),
                                    });
                                  }}
                                  style={{ height: "100%" }}
                                  endIcon={<RemoveCircleOutlineIcon />}
                                >
                                  Remove
                                </Button>
                              </Grid>
                            </>
                          )}
                        </>
                      );
                    })}
                  </Grid>
                  <Divider style={{ marginTop: "2%", marginBottom: "2%" }} />
                </CardContent>
              </Collapse>
              <Divider style={{ marginTop: "4%" }} />
              <Divider>
                <Chip
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(14,0,255,1) 0%, rgba(4,4,123,1) 65%, rgba(0,137,164,1) 100%)",
                    color: "white",
                  }}
                  label="ASSESSMENT INFORMATION"
                  light
                  size="large"
                />
              </Divider>
              <Divider style={{ marginBottom: "2%" }} />
              <Grid container rowSpacing={2} columnSpacing={1}>
                <Grid item xs={6}>
                  <TextField
                    id="candidateL1Assessment"
                    select
                    label="L1 Assessment"
                    value={candidate.l1Assessment}
                    onChange={(e) =>
                      setCandidate({
                        ...candidate,
                        l1Assessment: e.target.value,
                      })
                    }
                    fullWidth
                  >
                    {assessment.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {access && (
                  <Grid item xs={6}>
                    <TextField
                      id="candidateL2Assessment"
                      select
                      label="L2 Assessment"
                      fullWidth
                      value={candidate.l2Assessment}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          l2Assessment: e.target.value,
                        })
                      }
                    >
                      {assessment.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <TextField
                    id="candidateRemarks"
                    label="Remarks"
                    variant="outlined"
                    fullWidth
                    value={candidate.remarks}
                    onChange={(e) =>
                      setCandidate({ ...candidate, remarks: e.target.value })
                    }
                    multiline
                  />
                </Grid>
                {["WD", "TAC", "GOOD"].includes(candidate.l1Assessment) && (
                  <>
                    <Grid item xs={4}>
                      <Autocomplete
                        id="Companies"
                        disableClearable
                        options={companiesList}
                        getOptionLabel={(option) => option.companyName}
                        onChange={(e, newValue) => {
                          setCandidate({
                            ...candidate,
                            companyId: newValue._id,
                          });
                          setRolesList(newValue.roles);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Company"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Autocomplete
                        id="Roles"
                        disableClearable
                        options={rolesList}
                        getOptionLabel={(option) => option.designation}
                        onChange={(e, newValue) => {
                          setCandidate({ ...candidate, roleId: newValue._id });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Role"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        fullWidth
                      >
                        <DatePicker
                          label="Interview Date"
                          className="candidateCompanyEndDate"
                          sx={{ width: "100%" }}
                          fullWidth
                          value={candidate.interviewDate}
                          onChange={(e) => {
                            setCandidate({
                              ...candidate,
                              interviewDate: e,
                            });
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </>
                )}

                {["TAC", "GOOD"].includes(candidate.l2Assessment) && (
                  <>
                    <Grid item xs={4}>
                      <TextField
                        id="candidateInterviewStatus"
                        select
                        label="Interview Status"
                        value={candidate.interviewStatus}
                        onChange={(e) =>
                          setCandidate({
                            ...candidate,
                            interviewStatus: e.target.value,
                          })
                        }
                        fullWidth
                      >
                        {interviewStatus.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </>
                )}
                {["TAC", "GOOD"].includes(candidate.l2Assessment) &&
                  candidate.interviewStatus === "Select" && (
                    <>
                      <Grid item xs={4}>
                        <TextField
                          id="candidateRate"
                          type="Number"
                          label="Rate"
                          value={candidate.rate}
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              rate: e.target.value,
                            })
                          }
                          fullWidth
                        ></TextField>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          id="candidateSelect"
                          select
                          label="Tenure Status"
                          value={candidate.select}
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              select: e.target.value,
                            })
                          }
                          fullWidth
                        >
                          {select.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </>
                  )}
                {["TAC", "GOOD"].includes(candidate.l2Assessment) &&
                  candidate.interviewStatus === "Select" &&
                  candidate.select === "Tracking" && (
                    <>
                      <Grid item xs={4}>
                        <TextField
                          id="candidateEmpId"
                          label="Employee ID"
                          variant="outlined"
                          fullWidth
                          value={candidate.EMP_ID}
                          onChange={(e) =>
                            setCandidate({
                              ...candidate,
                              EMP_ID: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          fullWidth
                        >
                          <DatePicker
                            label="Onboarding Date"
                            className="candidateonboardingDate"
                            sx={{ width: "100%" }}
                            fullWidth
                            onChange={(e) => {
                              setCandidate({
                                ...candidate,
                                onboardingDate: e.target.value,
                              });
                            }}
                            value={candidate.onboardingDate}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={4}>
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          onChange={(e) => {
                            setCandidate({
                              ...candidate,
                              nextTrackingDate: e,
                            });
                          }}
                          value={candidate.nextTrackingDate}
                          fullWidth
                        >
                          <DatePicker
                            label="Next Tracking Date"
                            className="candidateNXD"
                            sx={{ width: "100%" }}
                            fullWidth
                            onChange={(e) => {
                              setCandidate({
                                ...candidate,
                                nextTrackingDate: e.target.value,
                              });
                            }}
                            value={candidate.nextTrackingDate}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </>
                  )}
                <Grid item xs={9} />
                <Grid item xs={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleAddCandidate}
                  >
                    SUBMIT
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            <BottomNavigation
              sx={{
                backgroundColor: alpha("#0B0B0B", 0.1),
                backdropFilter: "blur(60px)",
                paddingBottom: "1vh",
                marginBottom: "1vh",
              }}
            />
          </Card>
        </Container>
      </div>
    </>
  );
}