# Created by Noah Kantrowitz on 2007-07-15.
# Copyright (c) 2007 Noah Kantrowitz. All rights reserved.
import os.path

from pkg_resources import resource_filename

from trac.core import *
from trac.core import ComponentMeta
from trac.config import BoolOption
from trac.web.chrome import ITemplateProvider, add_stylesheet, Chrome, add_warning
from trac.web.api import IRequestFilter

from themeengine.api import ThemeEngineSystem, ThemeNotFound

class ThemeEngineModule(Component):
    """A module to provide the theme content."""

    custom_css = BoolOption('theme', 'enable_css', default='false',
                    doc='Enable or disable custom CSS from theme.')

    implements(ITemplateProvider, IRequestFilter)

    def __init__(self):
        self.system = ThemeEngineSystem(self.env)

    # ITemplateProvider methods
    def get_htdocs_dirs(self):
        try:
            theme = self.system.theme
            if theme and 'htdocs' in theme:
                yield 'theme', resource_filename(theme['module'], theme['htdocs'])
        except ThemeNotFound:
            pass

    def get_templates_dirs(self):
        try:
            theme = self.system.theme
            if theme and 'template' in theme:
                yield resource_filename(theme['module'], os.path.dirname(theme['template']))
        except ThemeNotFound:
            pass

    # IRequestFilter methods
    def pre_process_request(self, req, handler):
        return handler

    def post_process_request(self, req, template, data, content_type):
        try:
            theme = self.system.theme
        except ThemeNotFound, e:
            add_warning(req, 'Unknown theme %s configured. Please check your trac.ini. You may need to enable the theme\'s plugin.'%e.theme_name)
            theme = None
        
        if theme and 'css' in theme:
            add_stylesheet(req, 'theme/'+theme['css'])
        if theme and 'template' in theme:
            req.chrome['theme'] = os.path.basename(theme['template'])
        if self.custom_css:
            add_stylesheet(req, '/themeengine/theme.css')
        return template, data, content_type