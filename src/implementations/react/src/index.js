/**
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Checkbox,
  GlobalNav,
  IconButton,
  RadioButton,
  Range,
  TextField,
  TextArea
} from './react-hig';

import 'hig-vanilla/dist/hig.css';
import './index.css';

import logo from './images/bim-logo.png';
import profileImage from './images/profileImage.png';
import TopNavFixtures from './fixtures/topNavFixtures';

const SideNav = GlobalNav.SideNav;
const LinkList = GlobalNav.SideNav.LinkList;
const Link = GlobalNav.SideNav.LinkList.Link;
const Search = GlobalNav.SideNav.Search;
const SectionList = GlobalNav.SideNav.SectionList;
const Section = GlobalNav.SideNav.SectionList.Section;
const SectionCollapse = GlobalNav.SideNav.SectionList.Section.SectionCollapse;
const Group = GlobalNav.SideNav.SectionList.Section.Group;
const Module = GlobalNav.SideNav.SectionList.Section.Group.Module;
const ModuleCollapse = GlobalNav.SideNav.SectionList.Section.Group.Module.ModuleCollapse;
const Submodule = GlobalNav.SideNav.SectionList.Section.Group.Module.Submodule;
const TopNav = GlobalNav.TopNav;
const Profile = GlobalNav.TopNav.Profile;
const Shortcut = GlobalNav.TopNav.Shortcut;
const Help = GlobalNav.TopNav.Help;
const ProjectAccountSwitcher = GlobalNav.TopNav.ProjectAccountSwitcher;
const Account = GlobalNav.TopNav.ProjectAccountSwitcher.Account;
const Project = GlobalNav.TopNav.ProjectAccountSwitcher.Project;
const TopNavSearch = GlobalNav.TopNav.Search;
const SubNav = GlobalNav.SubNav;
const Tabs = GlobalNav.SubNav.Tabs;

const Slot = GlobalNav.Slot;

const topNavFixtures = new TopNavFixtures();

const links = [
  { title: 'Autodesk Main', url: 'http://www.autodesk.com' },
  {
    title: 'AutoCAD',
    url: 'https://www.autodesk.com/products/autocad/overview'
  },
  { title: 'Maya', url: 'https://www.autodesk.com/products/maya/overview' }
];

const checkboxStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      textFieldValue: 'Foobar',
      fn: false,
      tabs: [{ label: 'One', id: 0 }, { label: 'Two', id: 1 }],
      projects: topNavFixtures.projectList(),
      accounts: topNavFixtures.accountList(),
      accountSwitcherIsOpen: false,
      activeAccount: topNavFixtures.accountList()[0],
      activeProject: topNavFixtures.projectList()[0],
      activeLabel: `${topNavFixtures.accountList()[0].label} / ${topNavFixtures.projectList()[0].label}`,
      activeImage: topNavFixtures.projectList()[0].image,
      activeType: 'project',
      modules: [],
      sideNavOpen: false
    };

    this.setTextFieldValue = this.setTextFieldValue.bind(this);
    this.toggleSidenav = this.toggleSidenav.bind(this);
  }

  toggleSidenav() {
    this.setState({ sideNavOpen: !this.state.sideNavOpen });
  }

  handleTopNavSearchInputChange = event => {
    console.log('TopNav Search input', event.target.value);
  };

  profileSignOutClick = event => {
    console.log('Profile Sign Out button clicked!');
  };

  addTabBefore = () => {
    const nextLabel = Math.floor(Math.random() * 100000, 5);
    const nextTabs = Array.from(this.state.tabs);
    nextTabs.unshift({ label: nextLabel.toString(), id: nextLabel });
    this.setState({ tabs: nextTabs });
  };

  addTabAfter = () => {
    const nextLabel = Math.floor(Math.random() * 100000, 5);
    const nextTabs = Array.from(this.state.tabs);
    nextTabs.push({ label: nextLabel.toString(), id: nextLabel });
    this.setState({ tabs: nextTabs });
  };

  removeTab = () => {
    const nextTabs = Array.from(this.state.tabs);
    nextTabs.pop();
    this.setState({ tabs: nextTabs });
  };

  addModule = () => {
    const key = Math.floor(Math.random() * 100000, 5);
    const module = { title: `${key}`, icon: 'document-management', key: key };
    const modules = Array.from(this.state.modules);
    modules.push(module);
    this.setState({ modules: modules });
  };

  closeProjectAccountSwitcher = event => {
    this.setState({ isOpen: false });
  };

  openProjectAccountSwitcher = event => {
    this.setState({ isOpen: true });
  };

  setActiveProjectOrAccount = activeProjectOrAccountItem => {
    this.selectProjectOrAccountTarget(activeProjectOrAccountItem);
    this.setState({ isOpen: false });
  };

  selectProjectOrAccountTarget = targetItem => {
    if (targetItem.type === 'account') {
      this.state.accounts.forEach(account => {
        if (account.id === targetItem.id) {
          this.setState({
            activeAccount: account,
            activeLabel: this.state.activeProject
              ? `${account.label} / ${this.state.activeProject.label}`
              : account.label,
            activeImage: this.state.activeProject.image,
            activeType: 'account'
          });
        }
      });
    }

    if (targetItem.type === 'project') {
      this.state.projects.forEach(project => {
        if (project.id === targetItem.id) {
          this.setState({
            activeProject: project,
            activeLabel: this.state.activeAccount
              ? `${this.state.activeAccount.label} / ${project.label}`
              : project.label,
            activeImage: project.image,
            activeType: 'project'
          });
        }
      });
    }
  };

  retreiveProjectOrAccountLength = () => {
    return this.state.projects.length > 1 || this.state.accounts.length > 1;
  };

  logEvent(event, higElement) {
    let messageParts = [
      `${higElement.constructor.name} triggered an ${event.type} event`
    ];
    if (event.target.value !== undefined) {
      messageParts = messageParts.concat(`: ${event.target.value}`);
    }
    console.log(messageParts.join(''));
  }

  setTextFieldValue(event) {
    this.logEvent(event, TextField);
    this.setState({
      textFieldValue: event.target.value
    });
  }

  render() {
    return (
      <div>
        <GlobalNav sideNavOpen={this.state.sideNavOpen}>
          <SideNav>
            <LinkList>
              {links.map((link, i) => {
                return <Link title={link.title} link={link.url} key={i} />;
              })}
            </LinkList>
            <SectionList>
              <Section headerLabel="Project" headerName="ThunderStorm">
                <SectionCollapse />
                {topNavFixtures.menu().sections[0].groups.map((group, i) => {
                  return (
                    <Group key={i}>
                      {group.modules.map(module => {
                        return (
                          <Module
                            icon={module.icon}
                            contentImage={module.contentImage}
                            title={module.label}
                            key={module.label}
                          >
                            <ModuleCollapse />
                            {module.submodules.map(submodule => {
                              return (
                                <Submodule
                                  title={submodule.label}
                                  link="#"
                                  key={submodule.label}
                                />
                              );
                            })}
                          </Module>
                        );
                      })}
                    </Group>
                  );
                })}
                <Group>
                  {this.state.modules.map(module => {
                    return (
                      <Module
                        icon={module.icon}
                        title={module.title}
                        key={module.key}
                      />
                    );
                  })}
                </Group>
              </Section>
              <Section headerLabel="Account" headerName="GlobalConstruction">
                <SectionCollapse />
                {topNavFixtures.menu().sections[1].groups.map((group, i) => {
                  return (
                    <Group key={i}>
                      {group.modules.map(module => {
                        return (
                          <Module
                            icon={module.icon}
                            contentImage={module.contentImage}
                            title={module.label}
                            key={module.label}
                          >
                            <ModuleCollapse />
                            {module.submodules.map(submodule => {
                              return (
                                <Submodule
                                  title={submodule.label}
                                  link="#"
                                  key={submodule.label}
                                />
                              );
                            })}
                          </Module>
                        );
                      })}
                    </Group>
                  );
                })}
              </Section>
            </SectionList>
            <Search placeholder="Find module or submodule" />
          </SideNav>
          <TopNav
            logo={logo}
            logoLink="http://autodesk.com"
            onHamburgerClick={this.toggleSidenav}
          >
            <ProjectAccountSwitcher
              activeLabel={this.state.activeLabel}
              activeImage={this.state.activeImage}
              activeType={this.state.activeType}
              open={this.state.isOpen}
              onClickOutside={this.closeProjectAccountSwitcher}
              onClick={
                this.retreiveProjectOrAccountLength()
                  ? this.openProjectAccountSwitcher
                  : null
              }
              showCaret={this.retreiveProjectOrAccountLength() ? true : false}
            >
              {this.state.projects.map((project, i) => {
                return (
                  <Project
                    image={project.image}
                    label={project.label}
                    key={project.id}
                    active={this.state.activeProject.id === project.id}
                    onClick={this.setActiveProjectOrAccount.bind(this, {
                      id: project.id,
                      type: project.type
                    })}
                  />
                );
              })}
              {this.state.accounts.map((account, i) => {
                return (
                  <Account
                    image={account.image}
                    label={account.label}
                    key={account.id}
                    active={this.state.activeAccount.id === account.id}
                    onClick={this.setActiveProjectOrAccount.bind(this, {
                      id: account.id,
                      type: account.type
                    })}
                  />
                );
              })}
            </ProjectAccountSwitcher>

            <Shortcut icon="gear" title="Gears for Fears" link="/gears" />

            <Help title="HELLLP MEEEE!!!!" link="/help" />

            <Profile
              image={profileImage}
              name="Jane Doe"
              email="jane.doe@example.com"
              profileSettingsLink="http://www.autodesk.com"
              signOutLink="http://www.sanrio.com"
            />

            <TopNavSearch onInput={this.handleTopNavSearchInputChange} />
          </TopNav>
          <SubNav
            moduleIndicatorName="Documents Library"
            moduleIndicatorIcon="hamburger"
          >
            <Tabs
              defaultSelectedTabId={this.state.tabs[0].id}
              onChange={(newTabId, oldTabId) =>
                console.log(`New Tab: ${newTabId}`)}
            >
              {this.state.tabs.map(tab => (
                <Tabs.Tab key={tab.id} id={tab.id} label={tab.label} />
              ))}
            </Tabs>
          </SubNav>

          <Slot className="playground-content">
            <section>
              <h3>Tabs</h3>
              <Button title="Add tab before" onClick={this.addTabBefore} />
              <Button title="Add tab after" onClick={this.addTabAfter} />
              <Button title="Remove tab" onClick={this.removeTab} />
            </section>

            <section>
              <h3>Sidebar modules</h3>
              <Button title="Add Module" onClick={this.addModule} />
            </section>

            <section>
              <h3>Button</h3>

              <Button
                size="small"
                title="Small Button"
                onClick={() => {
                  console.log('Small Button on click');
                }}
              />

              <Button
                size="standard"
                title="Standard Button"
                onClick={() => {
                  console.log('Small Button on click');
                }}
              />

              <Button
                size="large"
                title="Large Button"
                onClick={() => {
                  console.log('Large Button on click');
                }}
              />

              <Button
                size="small"
                title="Disabled Button"
                disabled={true}
                onClick={() => {
                  console.log('Large Button on click');
                }}
                onBlur={() => console.log('onblur')}
                onFocus={() => console.log('focus')}
                onHover={() => console.log('hover')}
              />

              <Button
                size="small"
                type="primary"
                title="Primary Button"
                onClick={() => {
                  console.log('Small Primary Button on click');
                }}
              />

              <Button
                size="small"
                type="secondary"
                title="Secondary Button"
                onClick={() => {
                  console.log('Small Secondary Button on click');
                }}
              />

              <Button
                size="small"
                type="flat"
                title="Flat Button"
                onClick={() => {
                  console.log('Small Flat Button on click');
                }}
              />

              <Button
                size="small"
                type="primary"
                title="Standard Button with Icon"
                icon="gear"
                onClick={() => {
                  console.log('Button with icon on click');
                }}
              />

              <Button
                size="small"
                type="primary"
                title="Standard Button with Listeners Attached"
                onClick={() => {
                  console.log('Button with icon on click');
                }}
                onBlur={() => {
                  console.log('onblur');
                }}
                onFocus={() => {
                  console.log('focus');
                }}
                onHover={() => {
                  console.log('hover');
                }}
              />
            </section>

            <section>
              <h3>Icon Button</h3>
              <IconButton
                title="Icon button"
                link="#"
                icon="gear"
                onClick={() => {
                  console.log('Button with icon on click');
                }}
                onBlur={() => {
                  console.log('onblur');
                }}
                onFocus={() => {
                  console.log('focus');
                }}
                onHover={() => {
                  console.log('hover');
                }}
              />

              <IconButton
                disabled={true}
                title="Icon button"
                link="#"
                icon="gear"
                onClick={() => {
                  console.log('Button with icon on click');
                }}
                onBlur={() => {
                  console.log('onblur');
                }}
                onFocus={() => {
                  console.log('focus');
                }}
                onHover={() => {
                  console.log('hover');
                }}
              />
            </section>

            <section>
              <h3>Checkbox</h3>
              <div style={checkboxStyle}>
                <Checkbox
                  label="Required"
                  name="tsandcs"
                  value="asd"
                  required="You must check this box"
                />
                <Checkbox label="Not required" name="tsandcs" value="dfdf" />
                <Checkbox
                  label="Disabled"
                  name="tsandcs"
                  value="hhh"
                  disabled={true}
                />
                <Checkbox
                  label="Checked"
                  name="tsandcs"
                  value="werr"
                  checked={true}
                />
                <Checkbox name="nolabel" value="somevalue" />
                <Checkbox
                  label="Click me"
                  onHover={this.logEvent}
                  onChange={this.logEvent}
                  onFocus={this.logEvent}
                />
              </div>
            </section>

            <section>
              <h3>Radio Button</h3>
              <div style={checkboxStyle}>
                <div>empty button<RadioButton /></div><hr />
                <RadioButton
                  label="I AGREE"
                  name="tsandcs"
                  value="asd"
                  required="Required"
                />
                <RadioButton
                  label="Not required"
                  name="tsandcs"
                  value="dfdf"
                  required={null}
                />
                <RadioButton
                  label="Disabled"
                  name="tsandcs"
                  value="hhh"
                  disabled={true}
                />
                <RadioButton
                  label="Checked"
                  name="tsandcs"
                  value="werr"
                  checked={true}
                />
                {' '}
                <hr />
                <RadioButton
                  label="Click me"
                  onHover={this.logEvent}
                  onChange={this.logEvent}
                  onFocus={this.logEvent}
                />
              </div>
            </section>
            <section>
              <h3>Range</h3>
              <div>
                <Range
                  label="What is your age?"
                  instructions="You must be 21 or older."
                  required="Age is required."
                  minValue={21}
                  maxValue={99}
                  value={21}
                  step={1}
                />

              </div>
            </section>

            <section>
              <h3>TextField</h3>
              <TextField
                label="Tab title"
                placeholder="Foo"
                onBlur={this.logEvent}
                onChange={this.logEvent}
                onFocus={this.logEvent}
                onInput={this.setTextFieldValue}
                value={this.state.textFieldValue}
                required="This field is required."
              />
            </section>
            <section>
              <h3>TextArea</h3>
              <TextArea
                label="Tab title"
                placeholder="Foo"
                required="This field is required."
                onBlur={this.logEvent}
                onChange={this.logEvent}
                onFocus={this.logEvent}
                onInput={this.logEvent}
                name="say-my-name"
              />
            </section>

            <section>
              {topNavFixtures.hipsterContent().map((paragraph, i) => {
                return <p key={i}>{paragraph}</p>;
              })}
            </section>
          </Slot>
        </GlobalNav>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));