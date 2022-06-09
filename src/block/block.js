// Import Usestate and useffect from wordpress
import { useState, useEffect } from '@wordpress/element';

// Import Wordpress Block Editors
import {
    InspectorControls,
} from '@wordpress/block-editor';

// Import Wordpress Components
import { TextControl, RadioControl, ColorPicker, __experimentalNumberControl as NumberControl} from '@wordpress/components';

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType( 'cgb/block-button-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'button-block - CGB Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'button-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
        buttonText: {
            type: 'string',
            default: 'Click Here' // empty default
        },
		backgroundColor: {
            type: 'string',
            default: '#f1f2f2' // empty default
        },
		link: {
            type: 'string'            
        },
		btnBorderRadius: {
            type: 'integer',
			default: 10
        },
		target: {
            type: 'string'
        },
		padding: {
            type: 'integer',
			default: 20
        }
    },
	edit: ( props ) => {
		
		const [ buttonText, setButtonText ] = useState( props.attributes.buttonText );
		const [ linktag, setLink ] = useState( props.attributes.link );
		const [ targetlink, setTarget ] = useState( props.attributes.target );
		const [ backgroundColor, setBackgroundColor ] = useState( props.attributes.backgroundColor );
		const [ btnBorderRadius, setBtnBorderRadius ] = useState( props.attributes.btnBorderRadius );
		const [ padding, setPadding ] = useState( props.attributes.padding );

		useEffect(() => {			
			props.setAttributes( { 'buttonText': buttonText } );
			props.setAttributes( { 'link': linktag } );
			props.setAttributes( { 'target': targetlink } );
			props.setAttributes( { 'backgroundColor': backgroundColor } );
			props.setAttributes( { 'borderRadius': btnBorderRadius } );
			props.setAttributes( { 'padding': padding } );
		}, [ buttonText, linktag, targetlink, backgroundColor, btnBorderRadius, padding ] )

		return (
            <div style={{backgroundColor: backgroundColor, borderRadius: btnBorderRadius+"px", padding: padding+"px" }} className="Mybutton">

				<InspectorControls>

					<TextControl
						label="Enter Button Text"
						value={ buttonText }
						onChange={ ( value ) => setButtonText( value ) }
					/>
					
                    <TextControl
						label="Provide Link Here"
						value={ linktag }
						onChange={ ( value ) => setLink( value ) }
					/>

                    <RadioControl
						label="Choose Target"
						selected={ targetlink }
						options={ [
							{ label: 'Open in same page', value: '_self' },
							{ label: 'Open in same window new page', value: '_blank' },
							{ label: 'Open in new window', value: '_top' }
						] }
						onChange={ ( value ) => setTarget( value ) }
					/>

					<ColorPicker
					    label="Choose Background color for the Button"
						color={backgroundColor}
						onChange={ ( value ) => setBackgroundColor( value )}
						defaultValue="#000"
					/>
					
					<NumberControl
						label="Set Border Radius"
						isShiftStepEnabled={ true }
						onChange={ (value) => setBtnBorderRadius(value)}
						shiftStep={ 10 }
						value={ btnBorderRadius }
					/>

					<NumberControl
						label="Set Padding"
						isShiftStepEnabled={ true }
						onChange={ (value) => setPadding(value)}
						shiftStep={ 10 }
						value={ padding }
					/>
     				
				</InspectorControls>
					
				<a href={linktag} target = {targetlink}>
					{buttonText}
				</a>
				
			</div>
		);
	},



	save: ( props ) => {
		console.log(props);
		
		return (
			<div style={{backgroundColor: props.attributes.backgroundColor, borderRadius: props.attributes.btnBorderRadius+"px", padding: props.attributes.padding+"px" }} className="Mybutton" >

				<a href={props.attributes.link} target={props.attributes.target}>
					{props.attributes.buttonText}
				</a>

			</div>
		);
	},
} );
