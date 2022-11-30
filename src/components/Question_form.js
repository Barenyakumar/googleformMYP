import React,{useState} from 'react'
import './question_form.css'
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FormControlLabel from "@mui/material/FormControlLabel"
import { Button, IconButton, MenuItem, Select, Switch } from '@mui/material';
import {    AddCircleOutline, CropOriginalOutlined, FilterNone, MoreVertOutlined, OndemandVideoOutlined, Radio, ShortTextOutlined, TextFieldsOutlined } from "@mui/icons-material"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import SubjectIcon from "@mui/icons-material/Subject"
import ShortTextIcon from "@mui/icons-material/ShortText"
import CloseIcon from "@mui/icons-material/Close"
import NorthEastIcon from "@mui/icons-material/NorthEast"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}))



export default function Question_form() {

  const [questions, setQuestions] = useState(
    [{
      questionText: "how r u ?",
      questionType: "radio",
      options: [
        { optionText: "good" },
        { optionText: "bad" },
        {optionText: "help" }
      ],
      open: true,
      required: false
    }]
  )

  function changeQuestion(text, i) {
    let newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
    console.log(newQuestion)
    
  }

  function addQuestionType(i, type) {
    let qs = [...questions]
    console.log(type)
    qs[i].questionType = type
    setQuestions(qs)
  }

  function changeOptionValue(text, i, j) {
    let optionQuestion = [...questions]
    optionQuestion[i].options[j].optionText = text
    setQuestions(optionQuestion)
    console.log(optionQuestion)
  }

  function removeOption(i, j) {
    let removeOptionQuestions = [...questions]
    if (removeOptionQuestions[i].options.length > 1) {
      removeOptionQuestions[i].options.splice(j,1)
      setQuestions(removeOptionQuestions)
      console.log(i + " " + j)
    }
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions]
    if(optionsOfQuestion[i].options.length < 5)
    {
      optionsOfQuestion[i].options.push({optionText : " Option " + (optionsOfQuestion[i].options.length + 1)})
    } else {
      console.log("Max 5 questions ")
    }
    setQuestions(optionsOfQuestion)
  }


  function copyQuestion(i) {
    expandCloseAll()
    let qs = [...questions]
    var newQuestion = qs[i]
    setQuestions([...questions,newQuestion])
  }

  function deleteQuestion(i) {
    let qs = [...questions]
    if (questions.length > 1)
      qs.splice(i, 1)
    setQuestions(qs)
  }

  function requiredQuestion(i) {
    let qs = [...questions]
    qs[i].required = !qs[i].required
    console.log(qs[i].required + " " + i)
    setQuestions(qs)
  }

  function addMoreQuestionField() {
    expandCloseAll()
    setQuestions([...questions,
    {questionText: "Question" , questionType: "radio", options: [{optionText: "Option 1"}] , open: true, required: false}])
  }

  function onDragEnd(result) { 
    if (!result.destination) return;
    
    var itemgg = [...questions]
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF)
  }

  const reorder = (list, startIndex, endIndex) => { 
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  function expandCloseAll() {
    let qs = [...questions]
    for (let i = 0; i < qs.length; i++){
      qs[i].open = false
    }
    setQuestions(qs)
  }

  function handleExpand(i) {
    let qs = [...questions]
    for (let j = 0; j < qs.length; j++){
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false
      }
    }
    setQuestions(qs)
  }

  function questionUI() {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "0px" }}>
                <div style={{ width: "100%", marginBottom: "0px" }}>
                  <DragIndicatorIcon
                    style={{
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                      position: "relative",
                      left: "300px",
                    }}
                    fontSize="small"
                  />
                </div>

                <div>
                  <Accordion
                    expanded={questions[i].open}
                    onChange={() => {
                      handleExpand(i)
                    }}
                    className={questions[i].open ? "add_border" : ""}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      elevation={1}
                      style={{ width: "100%" }}
                    >
                      {!questions[i].open ? (
                        <div className="saved_questions">
                          <Typography
                            style={{
                              fontSize: "15px",
                              fontWeight: "400",
                              letterSpacing: ".1px",
                              lineHeight: "24px",
                              paddingBottom: "8px",
                            }}
                          >
                            {i + 1}.{questions[i].questionText}
                          </Typography>

                          {ques.options.map((op, j) => (
                            <div key={j}>
                              <div style={{ display: "flex" }}>
                                <FormControlLabel
                                  style={{
                                    marginLeft: "5px",
                                    marginBottom: "5px",
                                  }}
                                  disabled
                                  control={
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      style={{ marginRight: "3px" }}
                                      required={ques.type}
                                    />
                                  }
                                  label={
                                    <Typography
                                      style={{
                                        fontSize: "13px",
                                        fontWeight: "400",
                                        letterSpacing: ".2px",
                                        lineHeight: "200px",
                                        color: "#202124",
                                      }}
                                    >
                                      {" "}
                                      {ques.options[j].optionText}
                                    </Typography>
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </AccordionSummary>

                    {questions[i].open ? (
                      <div className="question_boxes">
                        <AccordionDetails className="add_question">
                          <div className="add_question_top">
                            <input
                              type="text"
                              className="question"
                              placeholder="Question"
                              value={ques.questionText}
                              onChange={(e) => {
                                changeQuestion(e.target.value, i)
                              }}
                            />
                            <p>crop</p>

                            <Select
                              className="select"
                              style={{ color: "#5f6368", fontsize: "13px" }}
                            >
                              <MenuItem
                                id="text"
                                value="Text"
                                onClick={() => {
                                  addQuestionType(i, "text")
                                }}
                              >
                                <SubjectIcon style={{ marginRight: "10px" }} />{" "}
                                Paragraph{" "}
                              </MenuItem>
                              <MenuItem
                                id="checkbox"
                                value="Checkbox"
                                onClick={() => {
                                  addQuestionType(i, "checkbox")
                                }}
                              >
                                <CheckBoxIcon
                                  style={{ marginRight: "10px" }}
                                  checked
                                />{" "}
                                Checkboxes{" "}
                              </MenuItem>
                              <MenuItem
                                id="radio"
                                value="Radio"
                                onClick={() => {
                                  addQuestionType(i, "radio")
                                }}
                              >
                                <Radio style={{ marginRight: "10px" }} />{" "}
                                Multiple Choice{" "}
                              </MenuItem>
                            </Select>
                          </div>
                          {ques.options.map((op, j) => (
                            <div className="add_question_body" key={j}>
                              {ques.questionType != "text" ? (
                                <input
                                  type={ques.questionType}
                                  style={{ marginRight: "10px" }}
                                />
                              ) : (
                                <ShortTextIcon
                                  style={{ marginRight: "10px" }}
                                />
                              )}
                              <div>
                                <input
                                  type="text"
                                  className="text_input"
                                  placeholder="Add Option"
                                  value={ques.options[j].optionText}
                                  onChange={(e) =>
                                    changeOptionValue(e.target.value, i, j)
                                  }
                                />
                              </div>
                              <CropOriginalOutlined
                                style={{ color: "#5f6368" }}
                              />
                              {/* <Button
                                size="small"
                                onClick={() => {
                                  addOption(i)
                                }}
                              >
                                {" "}
                                Add option
                              </Button> */}
                              <IconButton
                                aria-label="delete"
                                onClick={() => removeOption(i, j)}
                              >
                                <CloseIcon />
                              </IconButton>
                            </div>
                          ))}

                          {ques.options.length < 5 ? (
                            <div className="add_question_body">
                              <FormControlLabel
                                disabled
                                control={
                                  ques.questionType != "text" ? (
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      inputProps={{
                                        "aria-label": "secondary checkbox",
                                      }}
                                      style={{
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                      }}
                                      disabled
                                    />
                                  ) : (
                                    <ShortTextIcon
                                      style={{ marginRight: "10px" }}
                                    />
                                  )
                                }
                                label={
                                  // <Typography
                                  //   style={{
                                  //     fontSize: "13px",
                                  //     fontWeight: "400",
                                  //     letterSpacing: ".2px",
                                  //     lineHeight: "200px",
                                  //     color: "#202124",
                                  //   }}
                                  // >
                                  //   {" "}
                                  //   {ques.options[j].optionText}
                                  // </Typography>
                                  <div>
                                    <input
                                      type="text"
                                      className="text_input"
                                      style={{ fontSize: "13px" }}
                                      placeholder="Add other"
                                    />
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        addOption(i)
                                      }}
                                      style={{ textTransform: "none" }}
                                    />
                                  </div>
                                }
                              />
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="add_footer">
                            <div className="add_question_bottom_left">
                              <Button
                                size="small"
                                style={{ textTransform: "none" }}
                              >
                                <NorthEastIcon /> Answer key{" "}
                              </Button>
                            </div>
                            <div className="add_question_bottom">
                              <IconButton
                                aria-label="Copy"
                                onClick={() => {
                                  copyQuestion(i)
                                }}
                              >
                                <FilterNone />
                              </IconButton>
                              <IconButton
                                aria-label="Delete"
                                onClick={() => {
                                  deleteQuestion(i)
                                }}
                              >
                                <DeleteOutlineIcon />
                              </IconButton>
                              <span>Required</span>
                              <Switch
                                name="checkedA"
                                color="primary"
                                onClick={() => {
                                  requiredQuestion(i)
                                }}
                              />
                              <IconButton>
                                <MoreVertOutlined />
                              </IconButton>
                            </div>
                          </div>
                        </AccordionDetails>
                        <div className="question_edit">
                          <AddCircleOutline
                            className="edit"
                            onClick={addMoreQuestionField}
                          />
                          <OndemandVideoOutlined className="edit" />
                          <CropOriginalOutlined className="edit" />
                          <TextFieldsOutlined className="edit" />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ))
  }

  return (
    <div>
      <div className="question_form">
        <br />
        <br />
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input
                type="text"
                className="question_form_top_name"
                placeholder="untilted"
              />
              <input
                type="text"
                className="question_form_top_desc"
                placeholder="untilted"
              />
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questionUI()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}
