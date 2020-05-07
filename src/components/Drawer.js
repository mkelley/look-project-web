import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';

import AssignmentIcon from '@material-ui/icons/Assignment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LabelIcon from '@material-ui/icons/Label';

function DrawerItem({ href, text, icon }) {
  return (
    <ListItem button component="a" href={href}>
      <Tooltip title={text} placement="right">
        <ListItemIcon>
          {icon}
        </ListItemIcon>
      </Tooltip>
      <ListItemText primary={text} />
    </ListItem>
  );
}

export const mainListItems = (
  <div>
    <DrawerItem text="Dashboard" href="#dashboard" icon={<DashboardIcon />} />
    <DrawerItem text="Summary by date" href="#summary-by-date" icon={<CalendarTodayIcon />} />
    <DrawerItem text="Summary by object" href="#summary-by-object" icon={<LabelIcon />} />
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <DrawerItem text="Current month" href="#" icon={<AssignmentIcon />} />
    <DrawerItem text="Last quarter" href="#" icon={<AssignmentIcon />} />
    <DrawerItem text="All time" href="#" icon={<AssignmentIcon />} />
  </div>
);