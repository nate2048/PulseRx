import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  ArrowUpOnSquareStackIcon,
  DocumentArrowUpIcon,
  PencilSquareIcon,
  ChartBarIcon,
  PaperAirplaneIcon,
  HeartIcon

} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import logo from './pulserx_logo.png';

function Dashboard({ logout, handleComponentClick }) {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleClick = (componentName) => {
  // Call handleComponentClick to update the selected component
  handleComponentClick(componentName);
};

  return (
    <Card color="blue-gray-100" className="h-full w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <div className="container px-5">
          <img src={logo} width={50} height={50}/>
        </div>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 mr-2 mt-0" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal mt-0">
                Analytics
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={() => handleClick("Home")}>
                <ListItemPrefix>
                  <ChartBarIcon strokeWidth={3} className="h-3 w-5 mr-2" />
                </ListItemPrefix>
                Charts
              </ListItem>
              <ListItem onClick={() => handleClick("Insights")}>
                <ListItemPrefix>
                  <PaperAirplaneIcon strokeWidth={3} className="h-3 w-5 mr-2" />
                </ListItemPrefix>
                Insights
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ArrowUpOnSquareStackIcon className="h-5 w-5 mr-2" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Reporting
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={() => handleClick("Entry")}>
                <ListItemPrefix>
                  <PencilSquareIcon strokeWidth={3} className="h-3 w-5 mr-2" />
                </ListItemPrefix>
                Manual Reporting
              </ListItem>
               <ListItem onClick={() => handleClick("Document")}>
                <ListItemPrefix>
                  <DocumentArrowUpIcon strokeWidth={3} className="h-3 w-5 mr-2" />
                </ListItemPrefix>
                Document Upload
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem onClick={() => handleClick("Profile")}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem onClick={() => handleClick("About")}>
          <ListItemPrefix>
            <HeartIcon className="h-5 w-5" />
          </ListItemPrefix>
          About
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={logout}>Log Out</button>
        </ListItem>
      </List>

    </Card>
  );
}

export default Dashboard;
